<template>
  <Layout>
    <main
      class="content"
      id="content"
      role="main"
      itemprop="mainEntityOfPage"
      itemscope="itemscope"
      itemtype="https://schema.org/Blog"
    >
      <article
        class="entry post publish author-retrorocket format-standard"
        itemscope="itemscope"
        itemtype="https://schema.org/BlogPosting"
        itemprop="blogPost"
        v-for="edge in $page.index.edges"
        :key="edge.node.id"
      >
        <div class="entry-wrap">
          <header class="entry-header">
            <h2 class="entry-title" itemprop="headline">
              <g-link :to="edge.node.path">
                <span v-html="edge.node.title" />
              </g-link>
            </h2>
            <div class="entry-meta">
              <time
                class="entry-time"
                :datetime="`${edge.node.fulldate}`"
                itemprop="datePublished"
                >{{ edge.node.dateWithOffset }}</time
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
          </header>
          <!-- .entry-header -->
          <div class="entry-summary" itemprop="description">
            <p v-html="edge.node.excerpt" />
            <p>
              <span class="more"
                ><g-link :to="edge.node.path" class="more-link"
                  >続きを読む</g-link
                ></span
              >
            </p>
          </div>
          <footer class="entry-footer">
            <div class="entry-meta">
              <span class="entry-terms category" itemprop="articleSection">
                カテゴリー:
                <ul class="category-list">
                  <li v-for="tag in edge.node.categories" :key="tag.id">
                    <g-link :to="tag.path">{{ tag.title }}</g-link>
                  </li>
                </ul>
              </span>
            </div>
          </footer>
        </div>
      </article>
      <div class="navigation pagination">
        <Pager :info="$page.index.pageInfo" linkClass="page-numbers" />
      </div>
    </main>
  </Layout>
</template>

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

<script>
import { Pager } from "gridsome";
export default {
  components: {
    Pager,
  },
  metaInfo: {
    titleTemplate: "",
    title: "return $lock;",
    meta: [
      {
        name: "description",
        content:
          "自分の作成したツールや開発環境やプログラミングについて書くブログです。たまに技術に関係ないことも書きます。",
      },
    ],
  },
};
</script>

<page-query>
query ($page: Int) {
  index: allBlogPost(perPage: 5, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        excerpt
        title
        path
        dateWithOffset (format: "yyyy/MM/dd")
        fulldate: dateWithOffset
        categories {
          title
          path
        }
      }
    }
  }
}
</page-query>
