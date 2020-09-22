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
            <h1 class="entry-title" itemprop="headline">{{ $page.blogCategory.title }}</h1>
          </header>
          <!-- .entry-header -->
          <div class="entry-content" itemprop="text">
            <ul class="post-list">
              <li v-for="{ node } in $page.blogCategory.belongsTo.edges" :key="node.id">
                <g-link :to="node.path">{{ node.title }}</g-link>
                {{node.date}}
              </li>
            </ul>
          </div>
        </div>
      </article>
      <div class="navigation pagination">
        <Pager :info="$page.blogCategory.belongsTo.pageInfo" linkClass="page-numbers" />
      </div>
    </main>
  </Layout>
</template>

<page-query>
query BlogCategory ($id: ID!, $page: Int) {
  blogCategory(id: $id) {
    title
    belongsTo(page: $page, perPage: 100) @paginate {
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          ... on BlogPost {
            id
            title
            path
            date (format: "YYYY/MM/DD")
          }
        }
      }
    }
  }
}
</page-query>

<script>
import { Pager } from "gridsome";
export default {
  components: {
    Pager,
  },
  metaInfo() {
    return {
      title: this.$page.blogCategory.title,
    };
  },
};
</script>
