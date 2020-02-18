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

export default {
  components: {
    "post-list": PostList
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
  },
  methods: {
    addPost() {
      const postId = "greatPost" + Math.random();
      const userId = "jUjmgCurRRdzayqbRMO7aTG9X1G2";
      const post = {
        text: this.newPostText,
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.id,
        userId,
        ".key": postId
      };
      sourceData.posts[postId] = post;
      sourceData.users[userId].posts[postId] = postId;
      this.$set(this.thread.posts, postId, postId);
      this.newPostText = "";
    }
  }
};
</script>
