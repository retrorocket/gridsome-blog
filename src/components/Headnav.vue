<template>
  <nav
    id="navigation"
    class="nav-primary"
    role="navigation"
    itemscope="itemscope"
    itemtype="https://schema.org/SiteNavigationElement"
  >
    <div class="wrap">
      <a href="#" id="menu-icon" class="menu-icon">
        <span></span>
      </a>
      <ul id="menu-home" class="menu omega-nav-menu menu-primary">
        <li
          class="menu-item menu-item-type-post_type menu-item-object-page first"
        >
          <g-link to="/">home</g-link>
        </li>
        <li class="menu-item menu-item-type-post_type menu-item-object-page">
          <g-link to="/works">works</g-link>
        </li>
        <li class="menu-item menu-item-type-post_type menu-item-object-page">
          <g-link to="/contact">contact</g-link>
        </li>
        <li class="menu-item menu-item-type-custom menu-item-object-custom">
          <a href="https://about.retrorocket.biz">about me</a>
        </li>
        <li
          class="menu-item menu-item-type-post_type menu-item-object-page last"
        >
          <g-link to="/kampa">kampaniya</g-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style>
#navigation {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 1;
}
#navigation .wrap {
  position: relative;
}
</style>

<script>
export default {
  mounted() {
    window.addEventListener("scroll", this.onTouchStart);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onTouchStart);
  },
  methods: {
    onTouchStart() {
      if ("ontouchstart" in document.documentElement) {
        document.addEventListener("touchstart", () => {}, { passive: true });
      }
    },
  },
};
</script>
