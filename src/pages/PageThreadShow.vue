<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <post-list :posts="posts"></post-list>

    <post-editor :threadId="threadId"></post-editor>
  </div>
</template>

<script>
import sourceData from "@/data";
import PostList from "../components/PostList";
import PostEditor from "../components/PostEditor";

export default {
  components: {
    "post-list": PostList,
    "post-editor": PostEditor
  },
  props: {
    threadId: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      thread: sourceData.threads[this.threadId]
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
