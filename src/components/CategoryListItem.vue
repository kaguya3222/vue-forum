<template>
  <div class="forum-list">
    <h2 class="list-title">
      <router-link :to="{ name: 'Category', params: { id: category['.key'] } }">
        {{ category.name }}
      </router-link>
    </h2>
    <forum-list :forums="categoryForums" />
  </div>
</template>

<script>
import ForumList from "./ForumList";
import { mapGetters } from "vuex";

export default {
  name: "CategoryListItem.vue",
  components: { "forum-list": ForumList },
  props: {
    category: {
      required: true,
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      forums: "forums/items"
    }),
    categoryForums() {
      return Object.values(this.forums).filter(
        forum => forum.categoryId === this.category[".key"]
      );
    }
  }
};
</script>

<style scoped></style>
