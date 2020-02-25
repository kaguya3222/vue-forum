<template>
  <div class="col-full col-full_centered">
    <div class="col-full push-top">
      <h1>{{ category.name }}</h1>
    </div>
    <category-list-item :category="category" />
  </div>
</template>

<script>
import sourceData from "@/data.json";
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
      return sourceData.categories[this.id];
    }
  }
};
</script>

<style scoped></style>
