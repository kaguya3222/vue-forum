<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <post-list :posts="posts"></post-list>
  </div>
</template>

<script>
import sourceData from "@/data";
import PostList from "../components/PostList";

export default {
  components: {
    "post-list": PostList
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      thread: sourceData.threads[this.id]
    };
  },
  computed: {
    posts() {
      const postsIds = Object.values(this.thread.posts);
      return Object.values(sourceData.posts).filter(post =>
        postsIds.includes(post[".key"])
      );
    }
  }
};
</script>
