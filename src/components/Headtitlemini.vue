<template>
  <header
    id="header"
    class="site-header"
    role="banner"
    itemscope="itemscope"
    itemtype="https://schema.org/WPHeader"
  >
    <div class="wrap">
      <div class="title-area">
        <h1 class="site-title" itemprop="headline">
          <g-link to="/">{{ $static.metadata.siteName }}</g-link>
        </h1>
      </div>
    </div>
    <!--Waves end-->
  </header>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style scoped>
.site-title {
  padding-bottom: 20px;
}
</style>