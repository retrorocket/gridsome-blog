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
              Search results: {{ word }}
            </h1>
          </header>
          <!-- .entry-header -->
          <div class="entry-content" itemprop="text">
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
      word: this.$route.query.s,
    };
  },
  watch: {
    // クエリの変更を検知する
    $route(to, from) {
      this.word = this.$route.query.s;
    },
  },
  computed: {
    // 検索結果を返す算出プロパティ
    searchResults() {
      const results = [];
      if (!this.word) return [];
      lunr.Index.load(keywords)
        .search(`${this.word}*`)
        .forEach((result) => {
          this.$page.posts.edges.forEach((origin) => {
            if (origin.node.id === result.ref) {
              results.push({
                id: origin.node.id,
                path: origin.node.path,
                title: origin.node.title,
                date: origin.node.date,
              });
            }
          });
        });
      return results;
    },
  },
};
</script>
