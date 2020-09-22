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
  mounted() {
    this.showAd();
  },
  methods: {
    showAd() {
      this.$nextTick(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
          console.error(error);
        }
      });
    },
  },
};
</script>