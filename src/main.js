// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/style.css'
import '~/assets/prism.css'

export default function (Vue, { router, head, isClient }) {
  head.script.push({
    type: "text/javascript",
    src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
    async: true
  })
  head.link.push({
    rel: "alternate",
    type: "application/rss+xml",
    title: "return $lock; RSS Feed",
    href: 'https://retrorocket.biz/feed.xml'
  })
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
