<template>
  <Layout>
    <main class="content" id="content" role="main" itemprop="mainContentOfPage">
      <article
        id="post-15"
        class="entry page publish author-retrorocket post-15"
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
            <ul>
              <li v-for="result in searchResults" :key="result.id">
                <g-link :to="result.path">
                  <span v-html="result.title" />
                </g-link>
                {{ result.date }}
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
        date (format: "YYYY/MM/DD")
      }
    }
  }
}
</page-query>

<script>
const lunr = require("lunr");
require("lunr-languages/tinyseg.js")(lunr);
require("lunr-languages/lunr.stemmer.support.js")(lunr);
require("lunr-languages/lunr.multi.js")(lunr);
require("lunr-languages/lunr.ja.js")(lunr);
import keywords from "~/assets/keywords.json";

export default {
  metaInfo() {
    return {
      title: "search",
    };
  },
  data() {
    return {
      target: this.$route.query.s,
      lunrIndex: null,
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
      if (!this.target || !this.lunrIndex) return [];
      const results = [];
      this.lunrIndex.search(`${this.target}*`).forEach((result) => {
        const origin = this.$page.posts.edges.find(
          (origin) => origin.node.id === result.ref
        );
        if (origin) {
          results.push({
            id: origin.node.id,
            path: origin.node.path,
            title: origin.node.title,
            date: origin.node.date,
          });
        }
      });
      return results;
    },
  },
  beforeMount() {
    this.lunrIndex = lunr.Index.load(keywords);
  },
};
</script>
