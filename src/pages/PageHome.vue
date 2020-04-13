<template>
  <div v-if="asyncDataStatus_ready" class="col-full">
    <h1>Welcome to the forum</h1>
    <category-list :categories="Object.values(categories)" />
  </div>
</template>

<script>
import CategoryList from "../components/CategoryList";
import { mapGetters } from "vuex";
import asyncDataStatus from "../mixins/asyncDataStatus";

export default {
  components: {
    "category-list": CategoryList
  },
  mixins: [asyncDataStatus],
  computed: {
    ...mapGetters({
      categories: "categories/items"
    })
  },
  beforeCreate() {
    this.$store.dispatch("categories/fetchAllCategories").then(categories => {
      Promise.all(
        categories.map(category =>
          this.$store.dispatch("forums/fetchForums", {
            ids: Object.keys(category.forums)
          })
        )
      ).then(() => {
        this.asyncDataStatus_fetched();
      });
    });
  }
};
</script>
