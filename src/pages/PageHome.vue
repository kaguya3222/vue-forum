<template>
  <div class="col-full">
    <h1>Welcome to the forum</h1>
    <category-list :categories="Object.values(categories)" />
  </div>
</template>

<script>
import CategoryList from "../components/CategoryList";
import { mapGetters } from "vuex";

export default {
  components: {
    "category-list": CategoryList
  },
  computed: {
    ...mapGetters({
      categories: "categories/items"
    })
  },
  beforeCreate() {
    this.$store.dispatch("categories/fetchAllCategories").then(categories => {
      categories.forEach(category =>
        this.$store.dispatch("forums/fetchForums", {
          ids: Object.keys(category.forums)
        })
      );
    });
  }
};
</script>
