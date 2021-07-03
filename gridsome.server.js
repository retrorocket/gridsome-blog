// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const { tokenize } = require("kuromojin")
const { DateTime } = require("luxon");

const fs = require("fs-extra")
const CACHE_PATH = "./src/cache/keywords.json"
const data = require(CACHE_PATH)
const keywordCount = data.length;

module.exports = api => {
  api.loadSource(({ addSchemaResolvers }) => {

    // See:
    // https://www.broadleaves.dev/posts/2019-08-03-gridsome-flexsearch/
    // https://blog.solunita.net/posts/develop-blog-by-gridsome-from-scratch-full-text-search/
    addSchemaResolvers({
      RemarkHeading: {
        nodeName: {
          type: "String",
          resolve(node) {
            return "level-h" + node.depth;
          }
        }
      },
      BlogPost: {
        dateWithOffset: {
          type: "Date",
          args: {
            format: 'String'
          },
          resolve(node, args) {
            const datestr = new Date(node.date || null).toISOString();
            const dt = DateTime.fromISO(datestr).setZone("Asia/Tokyo");
            if (args.format) {
              return dt.toFormat(args.format);
            }
            return dt.toISO();
          }
        },
        keywords: {
          type: "String",
          resolve(node) {
            // keywordsを生成済みの記事はキャッシュのjsonファイルを参照する
            for (let i in data) {
              if (data[i].id === String(node.postid)) {
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
              if (data.unshift({ id: String(node.postid), keyword: keywordStr }) > keywordCount + 1) {
                return keywordStr;
              }
              if (process.env.NODE_ENV !== "development") {
                fs.writeJsonSync(CACHE_PATH, data,
                  {
                    encoding: 'utf-8',
                    replacer: null,
                    spaces: "  "
                  },
                  err => {
                  });
              }
              return keywordStr;
            })
          },
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
            year: dateWithOffset(format: "yyyy")
            month: dateWithOffset(format: "yyyy,MM")
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
        }
      });
    });

    yearMonths.forEach(yearMonthStr => {
      const yearMonth = yearMonthStr.split(",");
      createPage({
        path: `/archives/date/${yearMonth[0]}/${yearMonth[1]}`,
        component: "./src/templates/Years.vue",
        context: {
          displayYear: `${yearMonth[0]}/${yearMonth[1]}`,
          path: `/archives/date/${yearMonth[0]}/${yearMonth[1]}`,
        }
      });
    });

  })
}
