<template>
  <ClientOnly>
    <read-progress color="#75B5C5" height="4px" :shadow="false" opacity="0.7" />
  </ClientOnly>
</template>

<script>
export default {
  components: {
    ReadProgress: () =>
      import("vue-read-progress")
        .then((m) => m.default)
        .catch(),
  },
};
</script>
