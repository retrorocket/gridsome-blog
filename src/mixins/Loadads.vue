<script>
export default {
  data() {
    return {
      lazyloadads: false,
    };
  },
  mounted() {
    this.lazyloadads = false;
    window.addEventListener("scroll", this.onScrollLoadAds);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScrollLoadAds);
  },
  methods: {
    onScrollLoadAds() {
      if (
        !this.lazyloadads &&
        (document.documentElement.scrollTop != 0 ||
          document.body.scrollTop != 0)
      ) {
        let ad = document.createElement("script");
        ad.async = true;
        ad.src =
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        let sc = document.getElementsByTagName("script")[0];
        sc.parentNode.insertBefore(ad, sc);
        this.lazyloadads = true;
      }
    },
  },
};
</script>
