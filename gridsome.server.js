// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const DOMParser = require("universal-dom-parser")
const fs = require("fs-extra")
const CACHE_PATH = "./src/assets/keywords.json"
const lunr = require("lunr");
require("lunr-languages/tinyseg.js")(lunr);
require("lunr-languages/lunr.stemmer.support.js")(lunr);
require("lunr-languages/lunr.multi.js")(lunr);
require("lunr-languages/lunr.ja.js")(lunr); // or any other language you want

module.exports = api => {

  api.loadSource(({ addSchemaTypes, addSchemaResolvers }) => {
    addSchemaTypes(`
      type Toc implements Node {
        id: ID!
        textContent: String
        nodeName: String
      }
    `)

    addSchemaResolvers({
      BlogPost: {
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
            id
            content
            title
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

    // lunrのindexをファイルに出力する
    // TODO: ここでやる作業ではないはずだがどこで呼べばいいのかわからない
    const docs = data.allBlogPost.edges;

    const index = lunr(function () {
      this.use(lunr.multiLanguage("en", "jp"));
      this.ref("id");
      this.field("text");
      this.field("title", { boost: 10 });
      docs.forEach(({ node }) => {
        this.add({ id: node.id, title: node.title, text: node.content.replace(/<\/?[^>]+>/gi, "") });
      }, this);
    });

    fs.writeJsonSync(CACHE_PATH, index,
      {
        encoding: 'utf-8',
        replacer: null,
        spaces: "  "
      },
      err => {
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
