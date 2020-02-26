<template>
  <div class="col-full">
    <h1>Welcome to the forum</h1>
    <category-list :categories="categories" />
  </div>
</template>

<script>
import sourceData from "@/data.json";
import CategoryList from "../components/CategoryList";

export default {
  data() {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
      users: sourceData.users,
      forums: sourceData.forums,
      categories: Object.values(sourceData.categories)
    };
  },
  components: {
    "category-list": CategoryList
  }
};
</script>
