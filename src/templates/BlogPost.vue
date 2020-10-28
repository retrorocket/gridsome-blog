<template>
  <div class="site-container line-numbers">
    <Readprogress />
    <Headtitle />
    <!-- .site-header -->
    <Headnav />
    <!-- .nav-primary -->
    <div class="site-inner">
      <div class="wrap">
        <main
          class="content"
          id="content"
          role="main"
          itemprop="mainEntityOfPage"
          itemscope="itemscope"
          itemtype="https://schema.org/Blog"
        >
          <article
            class="entry post publish format-standard"
            itemscope="itemscope"
            itemtype="https://schema.org/BlogPosting"
            itemprop="blogPost"
          >
            <div class="entry-wrap">
              <header class="entry-header">
                <h1
                  class="entry-title"
                  itemprop="headline"
                  v-html="$page.blogPost.title"
                />
                <div class="entry-meta">
                  <span class="entry-time">{{ $page.blogPost.date }}</span>
                  by りゅー
                </div>
                <!-- .entry-meta -->
              </header>
              <!-- .entry-header -->
              <div
                class="entry-content"
                itemprop="articleBody"
                v-html="$page.blogPost.content"
              />
              <footer class="entry-footer">
                <div class="entry-meta">
                  <span class="entry-terms category" itemprop="articleSection">
                    カテゴリー:
                    <ul class="category-list">
                      <li
                        v-for="tag in $page.blogPost.categories"
                        :key="tag.id"
                      >
                        <g-link :to="tag.path">{{ tag.title }}</g-link>
                      </li>
                    </ul>
                  </span>
                </div>
              </footer>
            </div>
          </article>
        </main>
        <aside
          id="sidebar"
          class="sidebar sidebar-primary widget-area sticky-area"
          role="complementary"
          itemscope
          itemtype="https://schema.org/WPSideBar"
        >
          <section
            id="toc-wrapper"
            class="widget widget-1 even widget-first widget_text"
            v-show="tocTargets.length"
          >
            <div class="widget-wrap">
              <h4 class="widget-title">Table of contents</h4>
              <ul id="content-toc">
                <li
                  v-for="(target, index) in tocTargets"
                  :key="target.id"
                  :class="{
                    current: index === position,
                    [target.nodeName]: true,
                  }"
                >
                  <a :href="'#' + target.id">{{ target.textContent }}</a>
                </li>
              </ul>
            </div>
          </section>
          <section id="searchbox" class="widget">
            <div class="widget-wrap">
              <h4 class="widget-title">Search</h4>
              <SearchBox />
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

<page-query>
query BlogPost($path: String){
  blogPost(path:$path) {
    id
    title
    content
    date (format: "YYYY/MM/DD")
    path
    categories {
      id
      title
      slug
      path
    }
  }
  metadata {
    siteName
    siteUrl
  }
}
</page-query>

<script>
import MediumZoom from "medium-zoom";
import Prism from "~/assets/prism.js";
import { imageZoom } from "~/assets/imagezoom.js";
import Readprogress from "~/components/Readprogress.vue";
import Headtitle from "~/components/Headtitle.vue";
import Headnav from "~/components/Headnav.vue";
import Adsense from "~/components/Adsense.vue";
import Credit from "~/components/Credit.vue";
import SearchBox from "~/components/SearchBox.vue";

export default {
  components: {
    Adsense,
    Readprogress,
    Headtitle,
    Headnav,
    Credit,
    SearchBox,
  },
  data() {
    return {
      pageId: 0,
      position: 0,
      secTopArr: [],
      tocTargets: [],
    };
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
  },
  mounted() {
    this.createToc();
    this.prismHighlightAll();
    this.zoomImg();
    this.pageId = this.$page.blogPost.id;
    window.addEventListener("scroll", this.onScroll);
  },
  updated() {
    if (this.$page.blogPost.id !== this.pageId) {
      this.createToc();
      this.prismHighlightAll();
      this.zoomImg();
      this.pageId = this.$page.blogPost.id;
    }
  },
  methods: {
    onScroll() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      for (let i = this.secTopArr.length - 1; i >= 0; i--) {
        if (scrollTop > this.secTopArr[i] - 20) {
          this.position = i;
          break;
        }
      }
    },
    createToc() {
      this.$nextTick(() => {
        try {
          const targets = document.querySelectorAll(
            ".entry-content h2,.entry-content h3,.entry-content h4"
          );
          if (targets.length === 0) {
            // 見出しがない記事は配列を初期化する
            this.tocTargets = [];
            this.secTopArr = [];
            return;
          }
          const tempTocTargets = [];
          this.secTopArr = [];
          let countId = 1;
          targets.forEach((target) => {
            target.id = "title-" + countId;
            countId++;
            tempTocTargets.push({
              id: target.id,
              textContent: target.textContent,
              nodeName: `level-${target.nodeName.toLowerCase()}`,
            });
            // offsetの取得
            const rect = target.getBoundingClientRect();
            const scrollTop =
              window.pageYOffset || document.documentElement.scrollTop;
            const myTop = rect.top + scrollTop;
            this.secTopArr.push(myTop);
          });
          this.tocTargets = Array.from(tempTocTargets);
        } catch (error) {
          console.error(error);
        }
      });
    },
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
          imageZoom();
          MediumZoom(document.querySelectorAll(".entry-wrap img"));
        } catch (error) {
          console.error(error);
        }
      });
    },
    // See: https://gist.github.com/myaumyau/4975024
    decNumRefToString(decNumRef) {
      return decNumRef.replace(/&#(\d+);/gi, (match, $1, idx, all) => {
        return String.fromCharCode($1);
      });
    },
  },
  metaInfo() {
    return {
      link: [
        {
          rel: "canonical",
          href: this.$page.metadata.siteUrl + this.$page.blogPost.path,
        },
      ],
      title: this.decNumRefToString(this.$page.blogPost.title),
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

<style scoped>
.category-list {
  display: inline;
  padding: 0;
  margin: 0;
  list-style: none;
}
.category-list li {
  display: inline;
  padding-right: 8px;
}
</style>

<style>
#toc-wrapper {
  display: none;
}
@media (min-width: 1024px) {
  #toc-wrapper {
    display: block;
  }
  .sticky-area {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
  }
}
#content-toc li {
  padding-left: 4px;
  padding-right: 4px;
}
#content-toc .level-h3 {
  padding-left: 15px;
}
#content-toc .level-h4 {
  padding-left: 30px;
}
.current {
  background-color: #ededed;
  font-weight: bold;
}
</style>
