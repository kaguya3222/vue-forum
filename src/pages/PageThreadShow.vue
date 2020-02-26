<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <p>
      By <a href="#" class="link-unstyled">Robin</a>,
      <app-date :unixDate="thread.publishedAt" />.
    </p>

    <post-list :posts="threadPosts" />

    <post-editor :threadId="threadId" />
  </div>
</template>

<script>
import sourceData from "@/data.json";
import PostList from "../components/PostList";
import PostEditor from "../components/PostEditor";

export default {
  components: {
    "post-list": PostList,
    "post-editor": PostEditor
  },
  props: {
    threadId: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      thread: sourceData.threads[this.threadId]
    };
  },
  computed: {
    threadPosts() {
      const postsIds = Object.values(this.thread.posts);
      return Object.values(sourceData.posts).filter(post =>
        postsIds.includes(post[".key"])
      );
    }
  }
};
</script>
