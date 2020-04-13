<template>
  <div v-if="asyncDataStatus_ready" class="col-large push-top">
    <div class="thread-header">
      <div class="thread-details">
        <h1>{{ thread.title }}</h1>
        <p>
          By <a href="#" class="link-unstyled">{{ user.name }}</a
          >, <app-date :unixDate="thread.publishedAt" />.
        </p>
      </div>
      <router-link
        :to="{ name: 'ThreadEdit', threadId: this.threadId }"
        class="btn-green btn-small"
        tag="button"
        >Edit</router-link
      >
    </div>

    <span class="hide-mobile text-faded text-small"
      >{{ repliesCount }} replies by {{ contributorsCount }} contributors</span
    >

    <post-list :posts="threadPosts" />

    <post-editor :threadId="threadId" />
  </div>
</template>

<script>
import PostList from "../components/PostList";
import PostEditor from "../components/PostEditor";
import { mapGetters, mapActions } from "vuex";
import asyncDataStatus from "../mixins/asyncDataStatus";

export default {
  components: {
    "post-list": PostList,
    "post-editor": PostEditor
  },
  mixins: [asyncDataStatus],
  props: {
    threadId: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapGetters({
      posts: "posts/items",
      threads: "threads/items",
      users: "users/items",
      countThreadReplies: "threads/countThreadReplies"
    }),
    contributorsCount() {
      const userIds = this.threadPosts.map(post => post.userId);
      return [...new Set(userIds)].length - 1;
    },
    threadPosts() {
      const postsIds = Object.values(this.thread.posts);
      return Object.values(this.posts).filter(post =>
        postsIds.includes(post[".key"])
      );
    },
    repliesCount() {
      return this.countThreadReplies(this.thread[".key"]);
    },
    thread() {
      return this.threads[this.threadId];
    },
    user() {
      return this.users[this.thread.userId];
    }
  },
  methods: {
    ...mapActions("threads", ["fetchThread"]),
    ...mapActions("users", ["fetchUser"]),
    ...mapActions("posts", ["fetchPosts"])
  },
  created() {
    this.fetchThread({ id: this.threadId })
      .then(thread => {
        this.fetchUser({ id: thread.userId });
        return this.fetchPosts({ ids: Object.keys(thread.posts) });
      })
      .then(posts => {
        return Promise.all(
          posts.map(post => {
            this.fetchUser({ id: post.userId });
          })
        );
      })
      .then(() => {
        this.asyncDataStatus_fetched();
      });
  }
};
</script>

<style scoped></style>
