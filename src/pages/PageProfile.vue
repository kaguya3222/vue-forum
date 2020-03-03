<template>
  <div class="flex-grid">
    <user-profile-card
      v-if="!edit"
      :user="user"
      :userPostsCount="userPostsCount"
      :userThreadsCount="userThreadsCount"
    />
    <user-profile-card-editor
      v-else
      :user="user"
      :userPostsCount="userPostsCount"
      :userThreadsCount="userThreadsCount"
    />
    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead"> {{ user.username }}'s recent activity </span>
        <a href="#">See only started threads?</a>
      </div>

      <hr />
      <post-list :posts="userPosts" />
    </div>
  </div>
</template>

<script>
import PostList from "../components/PostList";
import { mapGetters } from "vuex";
import { countObjectProperties } from "../helpers";
import UserProfileCard from "../components/UserProfileCard";
import UserProfileCardEditor from "../components/UserProfileCardEditor";

export default {
  name: "PageProfile.vue",
  components: {
    "post-list": PostList,
    "user-profile-card": UserProfileCard,
    "user-profile-card-editor": UserProfileCardEditor
  },
  props: {
    edit: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapGetters({
      user: "authUser",
      posts: "posts"
    }),
    userPosts() {
      if (this.user.posts) {
        return Object.values(this.posts).filter(
          post => post.userId === this.user[".key"]
        );
      } else {
        return [];
      }
    },
    userPostsCount() {
      return countObjectProperties(this.userPosts);
    },
    userThreadsCount() {
      return countObjectProperties(this.user.threads);
    }
  }
};
</script>

<style scoped></style>
