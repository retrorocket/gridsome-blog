<template>
  <!--
    See:
    https://www.broadleaves.dev/posts/2019-08-03-gridsome-flexsearch/
    https://blog.solunita.net/posts/develop-blog-by-gridsome-from-scratch-full-text-search/
  -->
  <div class="widget_search">
    <p>
      <input type="search" class="search-field" placeholder="Search ..." v-model="searchTerm" />
    </p>
    <ul>
      <li v-for="result in searchResults" :key="result.index">
        <g-link :to="result.path">
          <span v-html="result.title" />
        </g-link>
      </li>
    </ul>
  </div>
</template>

<static-query>
query Posts {
  posts: allBlogPost {
    edges {
      node {
        id
        path
        title
        keywords
      }
    }
  }
}
</static-query>

<script>
import Flexsearch from "flexsearch";
export default {
  data() {
    return {
      searchTerm: "",
      index: null,
    };
  },
  computed: {
    // 検索結果を返す算出プロパティ
    searchResults() {
      if (this.index === null) return [];
      return this.index.search({
        query: this.searchTerm,
        limit: 10,
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
        field: ["title", "keywords"],
      },
    });
    this.index.add(this.$static.posts.edges.map((e) => e.node));
  },
};
</script>
