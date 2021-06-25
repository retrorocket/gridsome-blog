// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/style.css'
import 'prismjs/themes/prism-okaidia.css'
// Prism default CSS about line numbers
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import { VueReCaptcha } from 'vue-recaptcha-v3'

export default function (Vue, { router, head, isClient }) {
  head.htmlAttrs = { lang: 'ja' }
  head.link.push({
    rel: "alternate",
    type: "application/rss+xml",
    title: "return $lock; Blog Feed",
    href: 'https://retrorocket.biz/feed'
  })
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.use(VueReCaptcha, {
    siteKey: "6Lee5bgZAAAAAIyxRHmehFXMa38S0kPbAQv0Nb_1",
  })
}
