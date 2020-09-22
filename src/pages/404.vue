<template>
  <div class="site-container line-numbers">
    <Headtitle />
    <!-- .site-header -->
    <Headnav />
    <div class="site-inner">
      <div class="wrap">
        <main class="content" id="content" role="main" itemprop="mainContentOfPage">
          <article
            class="entry page publish author-retrorocket"
            itemscope="itemscope"
            itemtype="https://schema.org/CreativeWork"
          >
            <div class="entry-wrap">
              <header class="entry-header">
                <h1 class="entry-title" itemprop="headline">404 - not found</h1>
              </header>
              <!-- .entry-header -->
              <div class="entry-content" itemprop="text">
                <p>
                  <a href="https://retrorocket.biz">ホームページ</a>に戻ってお探しのものが見つかるかどうか試してみてください。
                </p>
              </div>
            </div>
          </article>
        </main>
        <aside
          id="sidebar"
          class="sidebar sidebar-primary widget-area"
          role="complementary"
          itemscope
          itemtype="https://schema.org/WPSideBar"
        ></aside>
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
        </div>
      </div>
    </footer>
    <!-- .site-footer -->
  </div>
</template>

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
</style>

<script>
import Headnav from "~/components/Headnav.vue";
import Headtitle from "~/components/Headtitle.vue";
import Credit from "~/components/Credit.vue";

export default {
  components: {
    Headnav,
    Credit,
    Headtitle,
  },
  metaInfo() {
    return {
      title: "404 not found",
    };
  },
};
</script>
