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

  templates: {
    BlogPost: '/archives/:postid',
    BlogCategory: [
      {
        path: (node) => {
          const lower = node.title.toLowerCase();
          return `/archives/category/${lower}`;
        }
      }
    ],
  },

  plugins: [
    {
      // Create posts from markdown files
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'BlogPost',
        path: 'content/posts/*.md',
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          categories: {
            typeName: 'BlogCategory',
            create: true
          }
        },
      }
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
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000,
        include: ['/archives/*', '/archives/category/*', '/archives/date/*'],
        config: {
          '/archives/*': {
            changefreq: 'monthly',
            priority: 0.8
          },
        }
      }
    }
  ],
  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        ['@gridsome/remark-prismjs', { showLineNumbers: true }],
        ['gridsome-remark-figure-caption', { captionClassName: "wp-caption-text", figureClassName: "wp-caption alignnone", }],
      ]
    }
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
