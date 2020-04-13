<template>
  <div v-if="asyncDataStatus_ready" class="forum-wrapper">
    <div class="col-full push-top">
      <div class="forum-header">
        <div class="forum-details">
          <h1>{{ forum.name }}</h1>
          <p class="text-lead">{{ forum.description }}</p>
        </div>
        <router-link
          :to="{
            name: 'ThreadCreate',
            params: { forumId: this.forum['.key'] }
          }"
          class="btn-green btn-small"
          >Start a thread</router-link
        >
      </div>
    </div>

    <div class="col-full push-top">
      <thread-list :threads="forumThreads" />
    </div>
  </div>
</template>

<script>
import ThreadList from "../components/ThreadList";
import { mapGetters, mapActions } from "vuex";
import asyncDataStatus from "../mixins/asyncDataStatus";

export default {
  name: "PageForum",
  components: {
    "thread-list": ThreadList
  },
  mixins: [asyncDataStatus],
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapGetters({
      threads: "threads/items",
      forums: "forums/items"
    }),
    forum() {
      return this.forums[this.id];
    },
    forumThreads() {
      return Object.values(this.threads).filter(
        thread => thread.forumId === this.id
      );
    }
  },
  methods: {
    ...mapActions("forums", ["fetchForum"]),
    ...mapActions("threads", ["fetchThreads"]),
    ...mapActions("users", ["fetchUser"])
  },
  created() {
    this.fetchForum({ id: this.id })
      .then(forum => {
        return this.fetchThreads({ ids: forum.threads });
      })
      .then(threads => {
        return Promise.all(
          threads.map(thread => this.fetchUser({ id: thread.userId }))
        );
      })
      .then(() => {
        this.asyncDataStatus_fetched();
      });
  }
};
</script>

<style scoped>
.forum-wrapper {
  width: 100%;
}
</style>
