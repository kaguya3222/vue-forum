<template>
  <div v-if="thread && user" class="thread">
    <div>
      <p>
        <router-link
          :to="{ name: 'ThreadShow', params: { threadId: thread['.key'] } }"
          >{{ thread.title }}</router-link
        >
      </p>
      <p class="text-faded text-xsmall">
        By <a href="#">{{ user.name }}</a
        >,
        <app-date :unixDate="thread.publishedAt" />
      </p>
    </div>

    <div class="activity">
      <p class="replies-count">{{ repliesCount }} replies</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    thread: {
      required: true,
      type: Object
    }
  },
  name: "ThreadListItem.vue",
  computed: {
    ...mapGetters({
      users: "users/items",
      countThreadReplies: "threads/countThreadReplies"
    }),
    repliesCount() {
      return this.countThreadReplies(this.thread[".key"]);
    },
    user() {
      return this.users[this.thread.userId];
    }
  }
};
</script>
