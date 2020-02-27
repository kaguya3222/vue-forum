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
export default {
  name: "PostEditor.vue",
  props: {
    threadId: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      thread: this.$store.state.threads[this.threadId],
      newPostText: ""
    };
  },
  methods: {
    addPost() {
      const post = {
        text: this.newPostText,
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.threadId,
        userId: "jUjmgCurRRdzayqbRMO7aTG9X1G2"
      };
      this.$store.dispatch("createPost", post);
      this.newPostText = "";
    }
  }
};
</script>
