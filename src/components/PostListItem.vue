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
      <div v-if="!editing">
        {{ post.text }}
      </div>
      <div class="col-full" v-else>
        <post-editor :post="post" @save="editing = false" />
      </div>
    </div>

    <app-date :unixDate="post.publishedAt" />
  </div>
</template>

<script>
import PostEditor from "./PostEditor";

import { countObjectProperties } from "../helpers";
import { mapGetters } from "vuex";

export default {
  name: "PostListItem.vue",
  components: {
    PostEditor
  },
  props: {
    post: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      editing: true
    };
  },
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
