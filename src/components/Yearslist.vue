<template>
  <div>
    <div
      v-for="(year, yindex) in new Set(
        $static.years.edges.map((e) => e.node.year)
      )"
      :key="`y-${yindex}`"
      class="monthly-archives"
    >
      <h6
        v-bind:class="{ isclicked: showList.indexOf(year) >= 0 }"
        @click="toggle(year)"
      >
        » {{ year }}
      </h6>

      <ul class="monthly-archives-list" v-show="showList.indexOf(year) >= 0">
        <li
          class="monthly-archives-list-link"
          v-for="(month, mindex) in new Set(
            $static.years.edges
              .map((e) => e.node.month)
              .filter((e) => e.indexOf(year) === 0)
              .reverse()
          )"
          :key="`m-${mindex}`"
        >
          <g-link :to="`/archives/date/${month}`">{{ month.slice(-2) }}</g-link>
        </li>
        <li class="monthly-archives-list-link">
          <g-link :to="`/archives/date/${year}`">all</g-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<static-query>
query {
  years: allBlogPost(sortBy: "published_at", order: ASC) {
    edges { 
      node { 
        year: date(format: "YYYY")
        month: date(format: "YYYY/MM")
      }
    }
  }
}
</static-query>

<style>
.monthly-archives h6 {
  color: #333;
  cursor: pointer;
  margin-bottom: 12px;
}
.monthly-archives h6.isclicked {
  color: #75b5c5;
}
.monthly-archives h6:hover {
  color: #75b5c5;
}
.monthly-archives-list {
  padding-bottom: 12px;
}
.monthly-archives-list .monthly-archives-list-link {
  display: inline-block;
  width: 20px;
  margin-bottom: 5px;
  margin-right: 8px;
}
</style>

<script>
export default {
  data() {
    return { showList: [] };
  },
  methods: {
    toggle(data) {
      if (this.showList.indexOf(data) >= 0) {
        this.showList = this.showList.filter((n) => n !== data);
      } else {
        this.showList.push(data);
      }
    },
  },
};
</script>
