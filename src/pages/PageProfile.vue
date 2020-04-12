<template>
  <div v-if="user && posts" class="flex-grid">
    <user-profile-card v-if="!edit" :user="user" />
    <user-profile-card-editor v-else :user="user" />
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
      user: "users/authUser",
      posts: "posts/items",
      testUserPosts: "users/userPosts"
    }),
    userPosts() {
      return this.user.posts
        ? Object.values(this.posts).filter(
            post => post.userId === this.user[".key"]
          )
        : [];
    }
  },
  watch: {
    user: {
      immediate: true,
      handler(value) {
        if (value) {
          this.$store.dispatch("posts/fetchPosts", {
            ids: Object.keys(value.posts)
          });
        }
      }
    }
  }
};
</script>

<style scoped></style>
