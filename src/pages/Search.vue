<template>
  <Layout>
    <main class="content" id="content" role="main" itemprop="mainContentOfPage">
      <article
        class="entry page publish"
        itemscope="itemscope"
        itemtype="https://schema.org/CreativeWork"
      >
        <div class="entry-wrap">
          <header class="entry-header">
            <h1 class="entry-title" itemprop="headline">
              Search results: {{ target }}
            </h1>
          </header>
          <!-- .entry-header -->
          <div class="entry-content" itemprop="text">
            <p>
              <input
                type="search"
                class="search-field"
                placeholder="Incremental Search ..."
                v-model="target"
              />
            </p>
            <p v-if="searchResults.length === 0">No results found.</p>
            <ul class="post-list">
              <li v-for="result in searchResults" :key="result.id">
                <g-link :to="result.path">
                  <span v-html="result.title" />
                </g-link>
                {{ result.dateWithOffset }}
              </li>
            </ul>
          </div>
        </div>
      </article>
    </main>
  </Layout>
</template>

<page-query>
query {
  posts: allBlogPost {
    edges {
      node {
        id
        path
        title
        keywords
        dateWithOffset (format: "yyyy/MM/dd")
      }
    }
  }
}
</page-query>

<script>
import Flexsearch from "flexsearch";

export default {
  metaInfo() {
    return {
      title: "search",
      meta: [
        {
          name: "description",
          content: "ブログの全文検索用ページです。",
        },
      ],
    };
  },
  data() {
    return {
      target: this.$route.query.s,
      index: null,
    };
  },
  watch: {
    // クエリの変更を検知する
    $route(to, from) {
      this.target = this.$route.query.s;
    },
  },
  computed: {
    // 検索結果を返す算出プロパティ
    searchResults() {
      if (!this.target || !this.index) return [];
      return this.index.search({
        query: this.target,
        limit: 100,
      });
    },
  },
  beforeMount() {
    this.index = new Flexsearch({
      tokenize: (str) => {
        return str.split(" ");
      },
      doc: {
        id: "id",
        field: ["keywords"],
      },
    });
    this.index.add(this.$page.posts.edges.map((e) => e.node));
  },
};
</script>

<style scoped>
.post-list li {
  margin-bottom: 8px;
}
</style>
