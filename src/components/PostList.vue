<template>
  <div class="post-list">
    <post-list-item v-for="post in posts" :key="post['.key']" :post="post" />
  </div>
</template>

<script>
import PostListItem from "./PostListItem";

export default {
  name: "PostList.vue",
  components: {
    "post-list-item": PostListItem
  },
  props: {
    posts: {
      required: true,
      type: Array
    }
  }
};
</script>

<style scoped></style>
