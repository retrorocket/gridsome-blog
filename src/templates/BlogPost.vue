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
              <span class="entry-time">{{ $page.blogPost.date }}</span>
              by りゅー
            </div>
            <!-- .entry-meta -->
          </header>
          <!-- .entry-header -->
          <div
            class="entry-content"
            itemprop="articleBody"
            v-html="$page.blogPost.content"
          />
          <footer class="entry-footer">
            <div class="entry-meta">
              <span class="entry-terms category" itemprop="articleSection">
                カテゴリー:
                <ul class="category-list">
                  <li v-for="tag in $page.blogPost.categories" :key="tag.id">
                    <g-link :to="tag.path">{{ tag.title }}</g-link>
                  </li>
                </ul>
              </span>
            </div>
          </footer>
        </div>
      </article>
    </main>
  </Layout>
</template>

<page-query>
query BlogPost($path: String){
  blogPost(path:$path) {
    id
    title
    content
    date (format: "YYYY/MM/DD")
    path
    categories {
      id
      title
      slug
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
export default {
  metaInfo() {
    return {
      link: [
        {
          rel: "canonical",
          href: this.$page.metadata.siteUrl + this.$page.blogPost.path,
        },
      ],
      title: this.$page.blogPost.title,
    };
  },
};
</script>

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
