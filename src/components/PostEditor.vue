<template>
  <form @submit.prevent="addPost()">
    <div class="form-group">
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        class="form-input"
        v-model="newPostText"
      ></textarea>
    </div>
    <div class="form-actions">
      <button class="btn-blue">Submit post</button>
    </div>
  </form>
</template>

<script>
import sourceData from "@/data.json";

export default {
  props: {
    threadId: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      thread: sourceData.threads[this.threadId],
      newPostText: ""
    };
  },
  methods: {
    addPost() {
      const postId = "greatPost" + Math.random();
      const userId = "jUjmgCurRRdzayqbRMO7aTG9X1G2";
      sourceData.posts[postId] = {
        text: this.newPostText,
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.threadId,
        userId,
        ".key": postId
      };
      sourceData.users[userId].posts[postId] = postId;
      this.$set(this.thread.posts, postId, postId);
      this.newPostText = "";
    }
  }
};
</script>
