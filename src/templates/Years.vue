<template>
  <Layout>
    <main class="content" id="content" role="main" itemprop="mainContentOfPage">
      <article
        class="entry page publish author-retrorocket"
        itemscope="itemscope"
        itemtype="https://schema.org/CreativeWork"
      >
        <div class="entry-wrap">
          <header class="entry-header">
            <h1 class="entry-title" itemprop="headline">
              {{ $context.displayYear }}
            </h1>
          </header>
          <!-- .entry-header -->
          <div class="entry-content" itemprop="text">
            <ul class="post-list">
              <li
                v-for="(month, mindex) in new Set(
                  $page.years.edges.filter(
                    (e) =>
                      e.node.month === $context.displayYear ||
                      e.node.year === $context.displayYear
                  )
                )"
                :key="`m-${mindex}`"
              >
                <g-link :to="month.node.path">
                  <span v-html="month.node.title" />
                </g-link>
                {{ month.node.dateWithOffset }}
              </li>
            </ul>
          </div>
        </div>
      </article>
    </main>
  </Layout>
</template>

<page-query>
query PostsByDate {
  years: allBlogPost {
    edges {
      node {
        id
        title
        path
        year: dateWithOffset(format: "yyyy")
        month: dateWithOffset(format: "yyyy/MM")
        dateWithOffset(format: "yyyy/MM/dd")
      }
    }
  }
  metadata {
    siteUrl
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      link: [
        {
          rel: "canonical",
          href: this.$page.metadata.siteUrl + this.$context.path,
        },
      ],
      title: `${this.$context.displayYear} の記事一覧`,
    };
  },
};
</script>

<style scoped>
.post-list li {
  margin-bottom: 8px;
}
</style>
