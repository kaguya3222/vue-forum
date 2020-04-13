<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>
      Create new thread in <i>{{ forum.name }}</i>
    </h1>
    <thread-editor @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import ThreadEditor from "../components/ThreadEditor";
import { mapGetters, mapActions } from "vuex";
import asyncDataStatus from "../mixins/asyncDataStatus";

export default {
  name: "PageThreadCreate",
  components: {
    "thread-editor": ThreadEditor
  },
  mixins: [asyncDataStatus],
  props: {
    forumId: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapGetters({
      forums: "forums/items"
    }),
    forum() {
      return this.forums[this.forumId];
    }
  },
  methods: {
    ...mapActions("forums", ["fetchForum"]),
    ...mapActions("threads", ["createThread"]),
    save({ text, title }) {
      this.createThread({
        forumId: this.forum[".key"],
        title: title,
        text: text
      }).then(thread => {
        this.$router.push({
          name: "ThreadShow",
          params: { threadId: thread[".key"] }
        });
      });
    },
    cancel() {
      const forumId = this.forumId;
      this.$router.push({ name: "Forum", params: { id: forumId } });
    }
  },
  created() {
    this.fetchForum({ id: this.forumId }).then(() => {
      this.asyncDataStatus_fetched();
    });
  }
};
</script>

<style scoped></style>
