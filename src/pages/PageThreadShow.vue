<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <router-link
      :to="{ name: 'ThreadEdit', threadId: this.threadId }"
      class="btn-green btn-small"
      tag="button"
      >Edit</router-link
    >

    <p>
      By <a href="#" class="link-unstyled">Robin</a>,
      <app-date :unixDate="thread.publishedAt" />.
    </p>

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
