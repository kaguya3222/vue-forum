<template>
  <div v-if="asyncDataStatus_ready" class="col-full col-full_centered">
    <div class="col-full push-top">
      <h1>{{ category.name }}</h1>
    </div>
    <category-list-item :category="category" />
  </div>
</template>

<script>
import CategoryListItem from "../components/CategoryListItem";
import { mapGetters, mapActions } from "vuex";
import asyncDataStatus from "../mixins/asyncDataStatus";

export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },
  name: "PageCategory",
  components: { "category-list-item": CategoryListItem },
  mixins: [asyncDataStatus],
  computed: {
    ...mapGetters({
      categories: "categories/items"
    }),
    category() {
      return this.categories[this.id];
    }
  },
  methods: {
    ...mapActions("categories", ["fetchCategory"]),
    ...mapActions("forums", ["fetchForums"])
  },
  created() {
    this.fetchCategory({ id: this.id })
      .then(category => {
        this.fetchForums({ ids: category.forums });
      })
      .then(() => {
        this.asyncDataStatus_fetched();
      });
  }
};
</script>

<style scoped></style>
