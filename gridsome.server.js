// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const { tokenize } = require("kuromojin")

module.exports = function (api) {
  api.loadSource(({ addSchemaResolvers }) => {
    addSchemaResolvers({
      BlogPost: {
        keywords: {
          type: "String",
          resolve(node) {
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
              return keywords.join(' ');
            })
          },
        },
      },
    })
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
