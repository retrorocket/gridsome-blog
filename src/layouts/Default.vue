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
          <section
            id="text-2"
            class="widget widget-1 even widget-first widget_text"
          >
            <div class="widget-wrap">
              <h4 class="widget-title">Information</h4>
              <div class="textwidget">
                <p>
                  技術的なメモを中心にスピンゴーするブログ。
                  <br />メールは
                  <a href="https://retrorocket.biz/contact">contact</a>
                  からお願いします。
                </p>
              </div>
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
                  ad-style="display:inline-block;width:250px;height:250px"
                  ad-format="rectangle"
                  ad-slot="1582513592"
                  ad-responsive="false"
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
                  {{ edge.node.date }}
                </li>
              </ul>
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
              <div
                v-for="(year, yindex) in new Set(
                  $static.years.edges.map((e) => e.node.year)
                )"
                :key="`y-${yindex}`"
                class="monthly_archives"
              >
                <h6
                  v-bind:class="{ isclicked: showList.indexOf(year) >= 0 }"
                  @click="toggle(year)"
                >
                  » {{ year }}
                </h6>
                <div
                  class="monthly_archives_list"
                  v-show="showList.indexOf(year) >= 0"
                >
                  <g-link
                    class="monthly_archives_list_link"
                    v-for="(month, mindex) in new Set(
                      $static.years.edges
                        .map((e) => e.node.month)
                        .filter((e) => e.indexOf(year) === 0)
                        .reverse()
                    )"
                    :key="`m-${mindex}`"
                    :to="`/archives/date/${month}`"
                    >{{ month.slice(-2) }}</g-link
                  >
                  <g-link
                    class="monthly_archives_list_link"
                    :to="`/archives/date/${year}`"
                    >all</g-link
                  >
                </div>
              </div>
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
  recently: allBlogPost(sortBy: "published_at", order: ASC, limit:10) {
    edges {
      node {
        id
        title
        path
        date (format: "YYYY/MM/DD")
      }
    }
  }
  category: allBlogCategory(sortBy: "slug", order: ASC) {
    edges { 
      node { 
        title
        slug
        path
      }
    }
  }
  years: allBlogPost(sortBy: "published_at", order: ASC) {
    edges { 
      node { 
        year: date(format: "YYYY")
        month: date(format: "YYYY/MM")
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
}
.entry-wrap .google-auto-placed {
  margin-bottom: 30px;
}
.monthly_archives h6 {
  color: #333;
  cursor: pointer;
  margin-bottom: 10px;
}
.monthly_archives h6.isclicked {
  color: #75b5c5;
}
.monthly_archives h6:hover {
  color: #75b5c5;
}
.monthly_archives_list {
  padding-bottom: 15px;
}
.monthly_archives_list_link {
  display: inline-block;
  width: 20px;
  margin-right: 8px;
}
</style>

<script>
import Adsense from "~/components/Adsense.vue";
import Prism from "~/assets/prism.js";
import Headtitle from "~/components/Headtitle.vue";
import Headnav from "~/components/Headnav.vue";
import Credit from "~/components/Credit.vue";
import SearchBox from "~/components/SearchBox.vue";
import MediumZoom from "medium-zoom";

export default {
  components: {
    Adsense,
    Headnav,
    Credit,
    Headtitle,
    SearchBox,
  },
  data() {
    return { showList: [] };
  },
  mounted() {
    this.prismHighlightAll();
    this.zoomImg();
  },
  updated() {
    this.prismHighlightAll();
    this.zoomImg();
  },
  methods: {
    prismHighlightAll() {
      this.$nextTick(() => {
        try {
          Prism.highlightAll();
        } catch (error) {
          console.error(error);
        }
      });
    },
    zoomImg() {
      this.$nextTick(() => {
        try {
          const images = document.querySelectorAll(".entry-wrap a img");
          images.forEach(function (image) {
            const origin = image.parentNode.href;
            image.dataset.zoomSrc = origin;
            image.parentNode.parentNode.insertBefore(image, image.parentNode);
          });
          MediumZoom(document.querySelectorAll(".entry-wrap img"));
        } catch (error) {
          console.error(error);
        }
      });
    },
    toggle(data) {
      if (this.showList.indexOf(data) >= 0) {
        this.showList = this.showList.filter((n) => n !== data);
      } else {
        this.showList.push(data);
      }
    },
  },
  metaInfo() {
    return {
      script: [
        {
          src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
          async: true,
        },
      ],
    };
  },
};
</script>
