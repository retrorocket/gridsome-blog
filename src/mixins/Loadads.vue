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
        /*        const url =
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9043961430295462";
        if (!document.querySelector(`script[src="${url}"]`)) {
          let ad = document.createElement("script");
          ad.async = true;
          ad.setAttribute("crossorigin", "anonymous");
          ad.src = url;
          let sc = document.getElementsByTagName("script")[0];
          sc.parentNode.insertBefore(ad, sc);
        } */
        this.lazyloadads = true;
      }
    },
  },
};
</script>
