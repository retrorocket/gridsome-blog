// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "return $lock;",
  siteUrl: "https://retrorocket.biz",
  permalinks: {
    trailingSlash: false,
  },
  plugins: [
    {
      use: "@gridsome/source-wordpress",
      options: {
        baseUrl: "https://retrorocket.biz/", // required
        typeName: "blog",
        apiBase: 'wp-json',
        perPage: 10,
        concurrent: 1,
      },
    },
    {
      use: "gridsome-plugin-feed",
      options: {
        contentTypes: ["BlogPost"],
        feedOptions: {
          title: "return $lock; Blog Feed",
          description: "全ての鍵にロックひとつ",
          link: "https://retrorocket.biz/",
          language: "ja"
        },
        rss: {
          enabled: true,
          output: "/feed.xml"
        },
        enforceTrailingSlashes: false,
        maxItems: 25,
        nodeToFeedItem: node => ({
          title: node.title,
          date: new Date(node.date),
          content: node.excerpt
        })
      }
    },
  ],
  templates: {
    BlogCategory: "/archives/category/:slug",
    BlogPost: "/archives/:id",
  },
  icon: {
    favicon: "./src/favicon.png",
    touchicon: {
      src: "./src/apple-touch-icon.png",
      sizes: [76, 152, 120, 167],
      precomposed: true,
    },
  },
};


