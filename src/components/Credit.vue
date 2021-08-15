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
    this.destroyServiceWorker;
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
        this.lazyloadads = true;
      }
    },
    destroyPagead() {
      const sc = document.getElementById("pagead2");
      sc.parentNode.removeChild(sc);
    },
    destroyServiceWorker() {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (let registration of registrations) {
          registration.unregister();
        }
      });
      caches.keys().then((keys) => {
        let promises = [];
        // キャッシュストレージを全て削除する
        keys.forEach((cacheName) => {
          if (cacheName) {
            promises.push(caches.delete(cacheName));
          }
        });
      });
    },
  },
};
</script>
