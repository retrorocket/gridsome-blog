<template>
  <div>
    <p class="copyright">
      Copyright &#169; 2021 return $lock;. |
      <g-link to="/privacy">プライバシーポリシー</g-link>
    </p>

    <p class="credit">
      Powered by
      <a class="theme-link" href="https://gridsome.org/">Gridsome</a> | Theme by
      <a class="theme-link" href="https://themehall.com" title="ThemeHall"
        >ThemeHall</a
      >
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lazyloadads: false,
    };
  },
  mounted() {
    this.lazyloadads = false;
    window.addEventListener("scroll", this.onScrollLoad);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScrollLoad);
    this.destroyPagead;
  },
  methods: {
    onScrollLoad() {
      if (
        (document.documentElement.scrollTop != 0 && !this.lazyloadads) ||
        (document.body.scrollTop != 0 && !this.lazyloadads)
      ) {
        let ad = document.createElement("script");
        ad.type = "text/javascript";
        ad.async = true;
        ad.id = "pagead2";
        ad.src =
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        let sc = document.getElementsByTagName("script")[0];
        sc.parentNode.insertBefore(ad, sc);
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        this.lazyloadads = true;
      }
    },
    destroyPagead() {
      const sc = document.getElementById("pagead2");
      sc.parentNode.removeChild(sc);
    },
  },
};
</script>
