<template>
  <div v-if="thread && text" class="col-full push-top">
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
import { mapGetters, mapActions } from "vuex";

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
    ...mapGetters({
      threads: "threads/items",
      posts: "posts/items"
    }),
    thread() {
      return this.threads[this.threadId];
    },
    text() {
      const post = this.posts[this.thread.firstPostId];
      return post ? post.text : null;
    }
  },
  methods: {
    ...mapActions("threads", ["fetchThread"]),
    ...mapActions("posts", ["fetchPost"]),
    async save({ title, text }) {
      const threadId = await this.$store.dispatch("threads/updateThread", {
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
  },
  created() {
    this.fetchThread({ id: this.threadId }).then(thread => {
      this.fetchPost({ id: thread.firstPostId });
    });
  }
};
</script>

<style scoped></style>
