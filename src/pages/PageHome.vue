<template>
  <div class="col-full">
    <h1>Welcome to the forum</h1>
    <thread-list :threads="threads"></thread-list>
  </div>
</template>

<script>
import sourceData from "@/data";
import ThreadList from "../components/ThreadList";

export default {
  data() {
    return {
      threads: Object.values(sourceData.threads),
      posts: sourceData.posts,
      users: sourceData.users
    };
  },
  components: {
    "thread-list": ThreadList
  }
};
</script>
