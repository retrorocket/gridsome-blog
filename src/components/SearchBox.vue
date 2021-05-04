<template>
  <div class="widget_search">
    <p>
      <input
        type="search"
        class="search-field"
        placeholder="Search ..."
        v-model="word"
        @keypress.prevent.enter.exact="check_word"
        @keyup.prevent.enter.exact="submit"
      />
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return { send_word: false, word: "" };
  },
  methods: {
    check_word() {
      if (!this.word) return;
      this.send_word = true;
    },
    submit() {
      if (!this.send_word) return;
      this.send_word = false;
      this.$router.push(`/search?s=${this.word}`);
    },
  },
};
</script>
