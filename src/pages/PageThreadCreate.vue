<template>
  <div class="col-full push-top">
    <h1>
      Create new thread in <i>{{ forum.name }}</i>
    </h1>
    <thread-editor @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import ThreadEditor from "../components/ThreadEditor";
export default {
  name: "PageThreadCreate",
  components: {
    "thread-editor": ThreadEditor
  },
  props: {
    forumId: {
      required: true,
      type: String
    }
  },
  computed: {
    forum() {
      return this.$store.state.forums[this.forumId];
    }
  },
  methods: {
    async save({ text, title }) {
      const threadId = await this.$store.dispatch("createThread", {
        forumId: this.forum[".key"],
        title: title,
        text: text
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
