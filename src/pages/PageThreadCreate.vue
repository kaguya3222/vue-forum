<template>
  <div class="col-full push-top">
    <h1>
      Create new thread in <i>{{ forum.name }}</i>
    </h1>

    <form @submit.prevent="save">
      <div class="form-group">
        <label for="thread_title">Title:</label>
        <input
          v-model="title"
          type="text"
          id="thread_title"
          class="form-input"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="thread_content">Content:</label>
        <textarea
          v-model="text"
          id="thread_content"
          class="form-input"
          name="content"
          rows="8"
          cols="140"
        ></textarea>
      </div>

      <div class="btn-group">
        <button class="btn btn-ghost" @click="cancel" type="button">
          Cancel
        </button>
        <button class="btn btn-blue" type="submit" name="Publish">
          Publish
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "PageThreadCreate",
  props: {
    forumId: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      text: "",
      title: ""
    };
  },
  computed: {
    forum() {
      return this.$store.state.forums[this.forumId];
    }
  },
  methods: {
    async save() {
      const threadId = await this.$store.dispatch("createThread", {
        forumId: this.forum[".key"],
        title: this.title,
        text: this.text
      });
      await this.$router.push({ name: "ThreadShow", params: { threadId } });
    },
    cancel() {
      const forumId = this.forumId;
      this.$router.push({ name: "Forum", params: { id: forumId } });
    }
  }
};
</script>

<style scoped></style>
