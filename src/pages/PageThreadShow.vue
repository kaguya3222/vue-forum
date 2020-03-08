<template>
  <div class="col-large push-top">
    <div class="thread-header">
      <div class="thread-details">
        <h1>{{ thread.title }}</h1>
        <p>
          By <a href="#" class="link-unstyled">Robin</a>,
          <app-date :unixDate="thread.publishedAt" />.
        </p>
      </div>
      <router-link
        :to="{ name: 'ThreadEdit', threadId: this.threadId }"
        class="btn-green btn-small"
        tag="button"
        >Edit</router-link
      >
    </div>

    <post-list :posts="threadPosts" />

    <post-editor :threadId="threadId" />
  </div>
</template>

<script>
import PostList from "../components/PostList";
import PostEditor from "../components/PostEditor";
import { mapGetters } from "vuex";

export default {
  components: {
    "post-list": PostList,
    "post-editor": PostEditor
  },
  props: {
    threadId: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapGetters(["posts", "threads"]),
    threadPosts() {
      const postsIds = Object.values(this.thread.posts);
      return Object.values(this.posts).filter(post =>
        postsIds.includes(post[".key"])
      );
    },
    thread() {
      return this.threads[this.threadId];
    }
  }
};
</script>

<style scoped></style>
