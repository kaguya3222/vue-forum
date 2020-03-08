<template>
  <form @submit.prevent="save">
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
      <button class="btn-blue">
        {{ isUpdate ? "Edit post" : "Submit post" }}
      </button>
    </div>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PostEditor.vue",
  props: {
    threadId: {
      required: false,
      type: String
    },
    post: {
      type: Object
    }
  },
  data() {
    return {
      newPostText: this.post ? this.post.text : ""
    };
  },
  computed: {
    ...mapGetters({
      user: "authUser",
      threads: "threads"
    }),
    isUpdate() {
      return !!this.post;
    }
  },
  methods: {
    save() {
      const post = this.isUpdate ? this.updatePost() : this.createPost();
      this.$emit("save", { post });
    },
    createPost() {
      const post = {
        text: this.newPostText,
        threadId: this.threadId
      };
      this.newPostText = "";
      return this.$store.dispatch("createPost", { post });
    },
    updatePost() {
      const payload = {
        postId: this.post[".key"],
        text: this.newPostText
      };
      return this.$store.dispatch("updatePost", payload);
    }
  }
};
</script>
