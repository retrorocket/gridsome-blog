<template>
  <!-- 
    See:
    https://knote.dev/post/2020-04-19/gridsome-google-adsense/
    https://gist.github.com/BeFiveINFO/e0f674479365f226a2816d30eab52b9f
  -->
  <ins
    class="adsbygoogle"
    :data-ad-layout="adLayout"
    :data-ad-client="adClient"
    :data-ad-slot="adSlot"
    :data-ad-format="adFormat"
    :data-full-width-responsive="adResponsive"
    :data-ad-layout-key="adLayoutKey"
    :style="adStyle"
  />
</template>

<script>
export default {
  props: {
    adClient: {
      type: String,
      required: false,
      default: "ca-pub-9043961430295462",
    },
    adSlot: {
      type: String,
      required: true,
      default: "",
    },
    adFormat: {
      type: String,
      required: false,
      default: "auto",
    },
    adLayout: {
      type: String,
      required: false,
      default: null,
    },
    adStyle: {
      type: String,
      required: false,
      default: "display: block;",
    },
    adResponsive: {
      type: String,
      required: false,
      default: null,
    },
    adLayoutKey: {
      type: String,
      required: false,
      default: null,
    },
  },
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
        ad.src =
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        let sc = document.getElementsByTagName("script")[0];
        sc.parentNode.insertBefore(ad, sc);
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        this.lazyloadads = true;
      }
    },
  },
};
</script>
