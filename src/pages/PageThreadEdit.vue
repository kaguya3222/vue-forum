<template>
  <div class="col-full push-top">
    <h1>
      Editing <i>{{ thread.title }}</i>
    </h1>

    <thread-editor
      :title="thread.title"
      :text="text"
      @save="save"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import ThreadEditor from "../components/ThreadEditor";
import { mapGetters } from "vuex";
export default {
  name: "PageThreadEdit",
  components: { "thread-editor": ThreadEditor },
  props: {
    threadId: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapGetters(["threads", "posts"]),
    thread() {
      return this.threads[this.threadId];
    },
    text() {
      return this.posts[this.thread.firstPostId].text;
    }
  },
  methods: {
    async save({ title, text }) {
      const threadId = await this.$store.dispatch("updateThread", {
        threadId: this.threadId,
        title,
        text
      });
      await this.$router.push({
        name: "ThreadShow",
        params: { threadId }
      });
    },
    cancel() {
      this.$router.push({
        name: "ThreadShow",
        params: { threadId: this.threadId }
      });
    }
  }
};
</script>

<style scoped></style>
