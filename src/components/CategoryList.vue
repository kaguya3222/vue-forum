<template>
  <div class="forum-list">
    <category-list-item
      v-for="category in categories"
      :key="category['.key']"
      :category="category"
    />
  </div>
</template>

<script>
import CategoryListItem from "./CategoryListItem";
export default {
  name: "CategoryList.vue",
  components: {
    "category-list-item": CategoryListItem
  },
  props: {
    categories: {
      required: true,
      type: Array
    }
  }
};
</script>

<style scoped></style>
