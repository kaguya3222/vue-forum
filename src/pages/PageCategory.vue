<template>
  <div class="col-full col-full_centered">
    <div class="col-full push-top">
      <h1>{{ category.name }}</h1>
    </div>
    <category-list-item :category="category" />
  </div>
</template>

<script>
import CategoryListItem from "../components/CategoryListItem";
export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },
  name: "PageCategory",
  components: { "category-list-item": CategoryListItem },
  computed: {
    category() {
      return this.$store.state.categories[this.id];
    }
  }
};
</script>

<style scoped></style>
