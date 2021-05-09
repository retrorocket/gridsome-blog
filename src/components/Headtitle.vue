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
    <!--Waves Container-->
    <div>
      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="parallax">
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="0"
            fill="rgba(117, 181, 197, 0.7)"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="3"
            fill="rgba(117, 181, 197, 0.5)"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="5"
            fill="rgba(117, 181, 197, 0.3)"
          />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#75b5c5" />
        </g>
      </svg>
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
/**
See: http://kachibito.net/css/simple-css-waves-with-svg
*/
header {
  line-height: 0;
}
.waves {
  position: relative;
  width: 100%;
  height: 15vh;
  margin-bottom: -7px; /*Fix for safari gap*/
  min-height: 80px;
  max-height: 80px;
}

/* Animation */
.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}
/*Shrinking for mobile*/
@media (max-width: 1023px) {
  .waves {
    display: none;
  }
}
</style>