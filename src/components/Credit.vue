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
  mounted() {
    this.destroyServiceWorker();
  },
  methods: {
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
