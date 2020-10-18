// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const { tokenize } = require("kuromojin")
const fs = require("fs-extra")
const CACHE_PATH = "./src/cache/keywords.json"

const data = fs.readJsonSync(CACHE_PATH, {
  encoding: 'utf-8',
  reviver: null,
  throws: true
});

const length = data.length;

module.exports = api => {
  api.loadSource(({ addSchemaResolvers }) => {
    addSchemaResolvers({
      BlogPost: {
        keywords: {
          type: "String",
          resolve(node) {
            // keywordsを生成済みの記事はキャッシュを参照する
            for (let i in data) {
              if (data[i].id === node.id) {
                return data[i].keyword
              }
            }
            const POS_LIST = ["名詞", "動詞", "形容詞"] // 対象品詞
            const IGNORE_REGEX = /^[!-/:-@[-`{-~、-〜”’・]+$/ //半角記号のみ
            const MIN_LENGTH = 2 // 最低文字数
            const str = node.title + node.content.replace(/<\/?[^>]+>/gi, ""); // html tag除外
            return tokenize(str).then(tokens => {
              const allTokens = tokens
                .filter(token => POS_LIST.includes(token.pos))
                .map(token => token.surface_form)
              const keywords = [...new Set(allTokens)]
                .filter(word => !IGNORE_REGEX.test(word))
                .filter(word => word.length >= MIN_LENGTH)
              const keywordStr = keywords.join(' ')
              if (data.unshift({ id: node.id, keyword: keywordStr }) > length + 1) {
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
      },
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
