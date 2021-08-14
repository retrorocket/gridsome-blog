<template>
  <div class="site-container line-numbers">
    <Readprogress />
    <!-- .site-header -->
    <Headtitlemini />
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
                  <time
                    class="entry-time"
                    :datetime="`${$page.blogPost.fulldate}`"
                    itemprop="datePublished"
                    >{{ $page.blogPost.dateWithOffset }}</time
                  >
                  <span
                    class="entry-author"
                    itemprop="author"
                    itemscope="itemscope"
                    itemtype="http://schema.org/Person"
                  >
                    by <span itemprop="name">りゅー</span></span
                  >
                </div>
                <!-- .entry-meta -->
              </header>
              <!-- .entry-header -->
              <div
                class="entry-content"
                itemprop="articleBody"
                v-html="$page.blogPost.content"
                ref="entryContent"
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
            v-show="$page.blogPost.headings.length"
          >
            <div class="widget-wrap">
              <h4 class="widget-title">Table of contents</h4>
              <ul id="content-toc">
                <li
                  v-for="(target, index) in $page.blogPost.headings"
                  :key="target.anchor"
                  :class="{
                    current: index === position,
                    [target.nodeName]: true,
                  }"
                >
                  <a :href="`${target.anchor}`">{{ target.value }}</a>
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
    headings {
      value
      anchor
      nodeName
    }
    dateWithOffset (format: "yyyy/MM/dd")
    fulldate: dateWithOffset
    path
    excerpt
    categories {
      id
      title
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
import ResizeObserver from "resize-observer-polyfill";
import Readprogress from "~/components/Readprogress.vue";
import Headtitlemini from "~/components/Headtitlemini.vue";
import Headnav from "~/components/Headnav.vue";
import Adsense from "~/components/Adsense.vue";
import Credit from "~/components/Credit.vue";
import SearchBox from "~/components/SearchBox.vue";

export default {
  components: {
    Adsense,
    Readprogress,
    Headtitlemini,
    Headnav,
    Credit,
    SearchBox,
  },
  data() {
    return {
      pageId: 0,
      position: 0,
      offsetTops: [],
      observer: null,
    };
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
    this.observer.disconnect(this.$refs.entryContent);
  },
  mounted() {
    this.zoomImg();
    this.twttrLoad();
    this.pageId = this.$page.blogPost.id;
    window.addEventListener("scroll", this.onScroll);
    this.observer = new ResizeObserver((entries) => {
      this.createToc();
    });
    this.observer.observe(this.$refs.entryContent);
  },
  updated() {
    if (this.$page.blogPost.id !== this.pageId) {
      this.zoomImg();
      this.twttrLoad();
      this.pageId = this.$page.blogPost.id;
      this.position = 0;
    }
  },
  methods: {
    onScroll() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      for (let i = this.offsetTops.length - 1; i >= 0; i--) {
        if (scrollTop > this.offsetTops[i] - 20) {
          this.position = i;
          break;
        }
      }
    },
    createToc() {
      this.$nextTick(() => {
        try {
          const targets = document.querySelectorAll(
            ".entry-content h2,.entry-content h3,.entry-content h4,.entry-content h5"
          );
          this.offsetTops = [];
          targets.forEach((target) => {
            // offsetの取得
            const rect = target.getBoundingClientRect();
            const scrollTop =
              window.pageYOffset || document.documentElement.scrollTop;
            this.offsetTops.push(rect.top + scrollTop);
          });
        } catch (error) {
          console.error(error);
        }
      });
    },
    zoomImg() {
      this.$nextTick(() => {
        try {
          MediumZoom(document.querySelectorAll(".entry-wrap img"));
        } catch (error) {
          console.error(error);
        }
      });
    },
    twttrLoad() {
      this.$nextTick(() => {
        try {
          if (window.twttr) {
            window.twttr.widgets.load();
          }
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
      meta: [
        {
          name: "description",
          content: this.$page.blogPost.excerpt,
        },
      ],
      script: [
        {
          src: "https://platform.twitter.com/widgets.js",
          async: true,
          body: true,
          charset: "utf-8",
        },
      ],
    };
  },
};
</script>

<style scoped>
@media (min-width: 1024px) {
  #navigation {
    border-bottom: 1px solid #ccc;
  }
}
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
.entry-content figure {
  display: table;
}
.entry-content img {
  max-height: 350px;
}
.medium-zoom-overlay {
  z-index: 2;
}
.medium-zoom-image {
  z-index: 3;
}
.entry-content ul li p {
  padding: 0;
  margin: 0;
}
.entry-content h2[id],
.entry-content h3[id],
.entry-content h4[id],
.entry-content h5[id] {
  display: block;
  padding-top: 70px;
  margin-top: -70px;
}
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
    top: 70px;
  }
}
#content-toc {
  max-height: 70vh;
  overflow-y: auto;
}
#content-toc a {
  text-decoration: none;
}
#content-toc li:not(.current) a {
  color: #888;
}
#content-toc li.current a {
  color: #75b5c5;
}
#content-toc li:not(.current) a:hover {
  color: #75b5c5;
}
#content-toc .level-h2 {
  padding-left: 10px;
}
#content-toc .level-h3 {
  padding-left: 20px;
}
#content-toc .level-h4 {
  padding-left: 30px;
}
#content-toc .level-h5 {
  padding-left: 40px;
}
#content-toc li.current {
  border-left: 3px solid #75b5c5;
  font-weight: bold;
}
</style>
