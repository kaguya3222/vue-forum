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
      <template v-if="!editing">
        <div class="post-text">
          {{ post.text }}
        </div>
        <a
          @click.prevent="editing = true"
          href="#"
          style="margin-left: auto;"
          class="link-unstyled"
          title="Make a change"
          ><i class="fa fa-pencil"></i
        ></a>
      </template>
      <div class="col-full" v-else>
        <post-editor :post="post" @save="editing = false" />
      </div>
    </div>

    <div class="post-date">
      <div v-if="post.edited" class="edition-info">edited</div>
      <app-date :unixDate="post.publishedAt" />
    </div>
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
      editing: false
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

<style scoped>
.post-text {
  margin-right: 10px;
}
</style>
