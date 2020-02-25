<template>
  <div class="col-full">
    <h1>Welcome to the forum</h1>
    <forum-list :forums="forums" />
  </div>
</template>

<script>
import sourceData from "@/data";
import ForumList from "../components/ForumList";

export default {
  data() {
    return {
      threads: Object.values(sourceData.threads),
      posts: sourceData.posts,
      users: sourceData.users,
      forums: Object.values(sourceData.forums)
    };
  },
  components: {
    "forum-list": ForumList
  }
};
</script>
