<template>
  <div>
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
  name: "ForumList.vue"
};
</script>

<style scoped></style>
