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
              <li v-for="{ node } in $page.years.edges" :key="node.id">
                <g-link :to="node.path">
                  <span v-html="node.title" />
                </g-link>
                {{ node.date }}
              </li>
            </ul>
          </div>
        </div>
      </article>
    </main>
  </Layout>
</template>

<page-query>
query PostsByDate($periodStartDate: Date, $periodEndDate: Date) {
  years: allBlogPost(filter: {date: {between: [$periodStartDate, $periodEndDate]} }) {
    edges {
      node {
        id
        title
        path
        date(format: "YYYY/MM/DD")
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$context.displayYear,
    };
  },
};
</script>
