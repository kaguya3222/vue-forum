import mutations from "../../../../src/store/modules/posts/mutations";
import sourceStore from "@/store/";

describe("setPost", () => {
  test("adds post to posts object", () => {
    const posts = sourceStore.state.posts;
    const postsLengthBeforeSet = Object.values(posts).length;
    mutations.setPost(sourceStore.state, {
      post: {
        text: "Hello guys",
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: "-KsjWehQ--apjDBwSBCY",
        userId: "jUjmgCurRRdzayqbRMO7aTG9X1G2"
      },
      postId: "greatPost" + Math.random()
    });
    const postsLengthAfterSet = Object.values(posts).length;
    expect(postsLengthBeforeSet < postsLengthAfterSet).toBe(true);
  });
});

describe("appendPostToThread", () => {
  test("adds post to thread object", () => {
    const threadId = "-KsjWehQ--apjDBwSBCY";
    const threadPosts = sourceStore.state.threads[threadId].posts;
    const threadPostsBeforeSet = Object.values(threadPosts).length;
    mutations.appendPostToThread(sourceStore.state, {
      postId: "greatPost" + Math.random(),
      threadId
    });
    const threadPostsAfterSet = Object.values(threadPosts).length;
    expect(threadPostsBeforeSet < threadPostsAfterSet).toBe(true);
  });
});

describe("appendPostToUser", () => {
  test("adds post to user object", () => {
    const userId = "jUjmgCurRRdzayqbRMO7aTG9X1G2";
    const userPosts = sourceStore.state.users[userId].posts;
    const userPostsBeforeSet = Object.values(userPosts).length;
    mutations.appendPostToUser(sourceStore.state, {
      postId: "greatPost" + Math.random(),
      userId
    });
    const userPostsAfterSet = Object.values(userPosts).length;
    expect(userPostsBeforeSet < userPostsAfterSet).toBe(true);
  });
});
