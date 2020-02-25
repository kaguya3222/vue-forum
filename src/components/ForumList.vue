<template>
  <div class="forum-list">
    <h2 class="list-title">
      <a href="category.html">Forums</a>
    </h2>
    <forum-list-item
      v-for="forum in forums"
      :key="forum['.key']"
      :forum="forum"
    />
  </div>
</template>

<script>
import ForumListItem from "./ForumListItem";
export default {
  components: {
    "forum-list-item": ForumListItem
  },
  props: {
    forums: {
      required: true,
      type: Array
    }
  },
  name: "ForumList"
};
</script>

<style scoped></style>
