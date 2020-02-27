<template>
  <div class="col-full">
    <h1>Welcome to the forum</h1>
    <category-list :categories="categories" />
  </div>
</template>

<script>
import CategoryList from "../components/CategoryList";

export default {
  data() {
    return {
      threads: this.$store.state.threads,
      posts: this.$store.state.posts,
      users: this.$store.state.users,
      forums: this.$store.state.forums,
      categories: Object.values(this.$store.state.categories)
    };
  },
  components: {
    "category-list": CategoryList
  }
};
</script>
