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
      <button v-if="isUpdate" @click.prevent="cancel" class="btn btn-ghost">
        Cancel
      </button>
      <button class="btn-blue">
        {{ isUpdate ? "Update post" : "Submit post" }}
      </button>
    </div>
  </form>
</template>

<script>
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
      return this.$store.dispatch("posts/createPost", { post });
    },
    updatePost() {
      const payload = {
        postId: this.post[".key"],
        text: this.newPostText
      };
      return this.$store.dispatch("posts/updatePost", payload);
    },
    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>
