// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const { tokenize } = require("kuromojin")
const fs = require("fs-extra")
const CACHE_PATH = "./src/cache/keywords.json"
const DOMParser = require("universal-dom-parser")

const data = fs.readJsonSync(CACHE_PATH, {
  encoding: 'utf-8',
  reviver: null,
  throws: true
});

const keywordCount = data.length;

module.exports = api => {
  api.loadSource(({ addSchemaTypes, addSchemaResolvers }) => {
    addSchemaTypes(`
      type Toc implements Node {
        id: ID!
        textContent: String
        nodeName: String
      }
    `)

    // See:
    // https://www.broadleaves.dev/posts/2019-08-03-gridsome-flexsearch/
    // https://blog.solunita.net/posts/develop-blog-by-gridsome-from-scratch-full-text-search/
    addSchemaResolvers({
      BlogPost: {
        keywords: {
          type: "String",
          resolve(node) {
            // keywordsを生成済みの記事はキャッシュのjsonファイルを参照する
            for (let i in data) {
              if (data[i].id === node.id) {
                return data[i].keyword
              }
            }
            const str = node.title + " " + node.content.replace(/<\/?[^>]+>/gi, ""); // html tag除外
            const newwords = [...new Set(str.match(/[一-龠]+|[ァ-ヴー]+/g).flat())]                // 1文字の要素を削除する
              .filter(word => word.length > 1)
            const POS_LIST = ["名詞", "動詞", "形容詞"] // 対象品詞
            const IGNORE_REGEX = /^[!-/:-@[-`{-~、-〜”’・]+$/ //半角記号のみ
            const MIN_LENGTH = 2 // 最低文字数
            return tokenize(str).then(tokens => {
              const allTokens = tokens
                .filter(token => POS_LIST.includes(token.pos))
                .map(token => token.surface_form)
              const keywords = [...new Set(allTokens)]
                .filter(word => !IGNORE_REGEX.test(word))
                .filter(word => word.length >= MIN_LENGTH)
              const result = [...new Set(keywords.concat(newwords))]
              const keywordStr = result.join(' ')
              if (data.unshift({ id: node.id, keyword: keywordStr }) > keywordCount + 1) {
                return keywordStr;
              }
              fs.writeJsonSync(CACHE_PATH, data,
                {
                  encoding: 'utf-8',
                  replacer: null,
                  spaces: "  "
                },
                err => {
                });
              return keywordStr;
            })
          },
        },
        tocTargets: {
          type: "[Toc]",
          resolve(node) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(`<html>${node.content}</html>`, 'text/html');
            const targets = doc.querySelectorAll("h2,h3,h4");
            const tocTargets = [];
            let countId = 1;
            targets.forEach((target) => {
              tocTargets.push({
                id: `title-${countId}`,
                textContent: target.textContent,
                nodeName: `level-${target.nodeName.toLowerCase()}`,
              });
              countId++;
            });
            return tocTargets;
          }
        },
        convertedContent: {
          type: "String",
          resolve(node) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(`<html>${node.content}</html>`, 'text/html');
            zoomImg(doc);
            targetIndex(doc);
            return doc.body.innerHTML;
          }
        },
      }
    })
  })

  api.createPages(async ({ graphql, createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    const { data } = await graphql(`{
      allBlogPost {
        edges {
          node {
            year: date(format: "YYYY")
            month: date(format: "YYYY,MM")
          }
        }
      }
    }`)

    // See: https://qiita.com/kyohei8/items/c112a49359e9ca360393
    const years = new Set();
    const yearMonths = new Set();

    data.allBlogPost.edges.forEach(({ node }) => {
      years.add(node.year);
      yearMonths.add(node.month);
    });

    years.forEach(year => {
      createPage({
        path: `/archives/date/${year}`,
        component: "./src/templates/Years.vue",
        context: {
          displayYear: year,
          periodStartDate: `${year}-01-01T00:00:00.000Z`,
          periodEndDate: `${year}-12-31T23:59:59.999Z`
        }
      });
    });

    yearMonths.forEach(yearMonthStr => {
      const yearMonth = yearMonthStr.split(",");
      const date = new Date(yearMonth[0], yearMonth[1], 0);
      const year = date.getFullYear();
      const month = ("00" + (date.getMonth() + 1)).slice(-2);
      const day = ("00" + date.getDate()).slice(-2);
      createPage({
        path: `/archives/date/${yearMonth[0]}/${yearMonth[1]}`,
        component: "./src/templates/Years.vue",
        context: {
          displayYear: `${yearMonth[0]}/${yearMonth[1]}`,
          periodStartDate: `${year}-${month}-01T00:00:00.000Z`,
          periodEndDate: `${year}-${month}-${day}T23:59:59.999Z`
        }
      });
    });

  })
}

const zoomImg = (doc) => {
  const images = doc.querySelectorAll("a img");
  images.forEach((image) => {
    const origin = image.parentNode.href;
    image.dataset.zoomSrc = origin;
    if (image.hasAttribute("aria-describedby")) {
      image.removeAttribute("sizes");
      image.removeAttribute("width");
      image.removeAttribute("height");
      image.removeAttribute("loading");
    }
    image.parentNode.parentNode.insertBefore(image, image.parentNode);
    image.nextElementSibling.remove();
  });
}

const targetIndex = (doc) => {
  const targets = doc.querySelectorAll("h2,h3,h4");
  let countId = 1;
  targets.forEach((target) => {
    target.id = `title-${countId}`;
    countId++;
  });
}
