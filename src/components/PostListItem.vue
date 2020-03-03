<template>
  <div class="post">
    <div class="user-info">
      <a href="#" class="user-name">{{ user.name }}</a>

      <a href="#">
        <img class="avatar-large" :src="user.avatar" alt="" />
      </a>

      <p class="desktop-only text-small">{{ userPostsCount }} posts</p>
    </div>

    <div class="post-content">
      <div>
        {{ post.text }}
      </div>
    </div>

    <app-date :unixDate="post.publishedAt" />
  </div>
</template>

<script>
import { countObjectProperties } from "../helpers";
import { mapGetters } from "vuex";

export default {
  props: {
    post: {
      required: true,
      type: Object
    }
  },
  name: "PostListItem.vue",
  computed: {
    ...mapGetters(["users"]),
    user() {
      return this.users[this.post.userId];
    },
    userPostsCount() {
      return countObjectProperties(this.user.posts);
    }
  }
};
</script>
