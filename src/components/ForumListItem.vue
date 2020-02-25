<template>
  <div class="forum-listing">
    <div class="forum-details">
      <router-link
        class="text-xlarge"
        :to="{ name: 'Forum', params: { id: forum['.key'] } }"
      >
        {{ forum.name }}
      </router-link>
      <p>{{ forum.description }}</p>
    </div>

    <div class="threads-count">
      <p class="count">{{ threadsCount }}</p>
      {{ threadsCountWord }}
    </div>

    <div class="last-thread">
      <!-- TODO: implement later -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    forum: {
      required: true,
      type: Object
    }
  },
  name: "ForumListItem",
  computed: {
    threadsCount() {
      return this.forum.threads ? Object.values(this.forum.threads).length : 0;
    },
    threadsCountWord() {
      return this.threadsCount === 1 ? "thread" : "threads";
    }
  }
};
</script>

<style scoped></style>
