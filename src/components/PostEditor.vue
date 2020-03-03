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
import { mapGetters } from "vuex";
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
      newPostText: ""
    };
  },
  computed: {
    ...mapGetters({
      user: "authUser",
      threads: "threads"
    }),
    thread() {
      return this.threads[this.threadId];
    }
  },
  methods: {
    addPost() {
      const postId = "greatPost" + Math.random();
      const userId = this.user[".key"];
      const post = {
        text: this.newPostText,
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.threadId,
        userId,
        ".key": postId
      };
      this.$store.dispatch("createPost", { post });
      this.newPostText = "";
    }
  }
};
</script>
