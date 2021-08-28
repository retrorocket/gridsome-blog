<template>
  <div class="site-container line-numbers">
    <Headtitle />
    <!-- .site-header -->
    <Headnav />
    <!-- .nav-primary -->
    <div class="site-inner">
      <div class="wrap">
        <slot />
        <aside
          id="sidebar"
          class="sidebar sidebar-primary widget-area"
          role="complementary"
          itemscope
          itemtype="https://schema.org/WPSideBar"
        >
          <section id="searchbox" class="widget">
            <div class="widget-wrap">
              <h4 class="widget-title">Search</h4>
              <SearchBox />
            </div>
          </section>
          <section id="recent-posts-2" class="widget widget_recent_entries">
            <div class="widget-wrap">
              <h4 class="widget-title">Recently</h4>
              <ul>
                <li v-for="edge in $static.recently.edges" :key="edge.node.id">
                  <g-link :to="edge.node.path">{{ edge.node.title }}</g-link>
                  {{ edge.node.dateWithOffset }}
                </li>
              </ul>
            </div>
          </section>
          <section
            id="custom_html-2"
            class="widget_text widget widget-2 odd widget_custom_html"
          >
            <div class="widget_text widget-wrap">
              <h4 class="widget-title">Sponsored Links</h4>
              <div>
                <Adsense
                  ad-style="display:block"
                  ad-format="auto"
                  ad-slot="4744746673"
                  full-width-responsive="true"
                  v-if="lazyloadads"
                />
              </div>
              <div>
                <a
                  href="https://www.amazon.co.jp/%E3%83%90%E3%83%B3%E3%83%80%E3%82%A4-BANDAI-7031400-%E3%83%A2%E3%83%B3%E3%82%B9%E3%83%BC%E3%83%8E-%E3%83%AD%E3%83%83%E3%82%AF/dp/B008B4AOSA/ref=as_li_ss_il?ie=UTF8&qid=1552906381&sr=8-4&keywords=%E3%83%A2%E3%83%B3%E3%82%B9%E3%83%BC%E3%83%8E&linkCode=li3&tag=retrorocket00-22&linkId=7da7f523b10f33f0177c5d3bfcea0a89&language=ja_JP"
                  target="_blank"
                >
                  <img
                    border="0"
                    src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B008B4AOSA&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=retrorocket00-22&language=ja_JP"
                    alt="モンスーノ ロック"
                    width="250"
                    height="221"
                  />
                </a>
                <br />Amazon.co.jp
                <a
                  href="https://www.amazon.co.jp/%E3%83%90%E3%83%B3%E3%83%80%E3%82%A4-BANDAI-7031400-%E3%83%A2%E3%83%B3%E3%82%B9%E3%83%BC%E3%83%8E-%E3%83%AD%E3%83%83%E3%82%AF/dp/B008B4AOSA/ref=as_li_ss_tl?ie=UTF8&qid=1552906381&sr=8-4&keywords=%E3%83%A2%E3%83%B3%E3%82%B9%E3%83%BC%E3%83%8E&linkCode=ll1&tag=retrorocket00-22&linkId=ac0f44818ff0a76e78dbf37b3141f135&language=ja_JP"
                  >モンスーノ ロック</a
                >
              </div>
            </div>
          </section>
          <section id="categories-2" class="widget widget_categories">
            <div class="widget-wrap">
              <h4 class="widget-title">Categories</h4>
              <ul>
                <li v-for="edge in $static.category.edges" :key="edge.node.id">
                  <g-link :to="edge.node.path">{{ edge.node.title }}</g-link>
                </li>
              </ul>
            </div>
          </section>
          <section id="archives-2" class="widget widget-last">
            <div class="widget-wrap">
              <h4 class="widget-title">Archives</h4>
              <Yearslist />
            </div>
          </section>
        </aside>
      </div>
    </div>
    <footer
      id="footer"
      class="site-footer"
      role="contentinfo"
      itemscope="itemscope"
      itemtype="http://schema.org/WPFooter"
    >
      <div class="wrap">
        <div class="footer-content footer-insert">
          <Credit />
          <p class="ad" style="clear: both; padding-top: 20px">
            <!-- 横長レスポンシブ -->
            <Adsense
              ad-style="display:block"
              ad-slot="3403340654"
              ad-responsive="true"
              ad-format="auto"
              full-width-responsive="true"
              v-if="lazyloadads"
            />
          </p>
        </div>
      </div>
    </footer>
    <!-- .site-footer -->
  </div>
</template>

<static-query>
query {
  recently: allBlogPost(limit:10) {
    edges {
      node {
        id
        title
        path
        dateWithOffset (format: "yyyy/MM/dd")
      }
    }
  }
  category: allBlogCategory(sortBy: "title", order: ASC) {
    edges { 
      node { 
        title
        path
      }
    }
  }
}
</static-query>

<style>
hr {
  border: 0;
  border-bottom: medium double #999;
  margin-top: 5px;
  margin-bottom: 20px;
}
h2.entry-title,
h1.entry-title {
  font-size: 28px;
}
.entry-wrap {
  word-wrap: break-word;
}
.wp-caption {
  padding-bottom: 20px;
}
.entry-wrap img {
  margin-bottom: 10px;
}
.entry-wrap code:not([class]) {
  background-color: #eeeeee;
  color: #333;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  padding: 4px;
}
pre .google-auto-placed {
  display: none;
}
.entry-wrap pre[class*="language-"] {
  margin-bottom: 30px;
}
.entry-wrap .google-auto-placed {
  margin-top: 15px;
  margin-bottom: 30px;
  overflow-x: auto !important;
}
.entry-wrap .google-auto-placed ins {
  max-width: 100% !important;
}
</style>

<script>
import Adsense from "~/components/Adsense.vue";
import Headtitle from "~/components/Headtitle.vue";
import Headnav from "~/components/Headnav.vue";
import Credit from "~/components/Credit.vue";
import SearchBox from "~/components/SearchBox.vue";
import Yearslist from "~/components/Yearslist.vue";
import Loadads from "~/mixins/Loadads.vue";

export default {
  mixins: [Loadads],
  components: {
    Adsense,
    Headnav,
    Credit,
    Headtitle,
    SearchBox,
    Yearslist,
  },
};
</script>
