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
