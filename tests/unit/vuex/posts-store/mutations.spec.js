import mutations from "../../../../src/store/modules/posts/mutations";
import rootStore from "@/store/";
import postsStore from "@/store/modules/posts/store";
import usersStore from "@/store/modules/users/store";

describe("setPost", () => {
  test("adds post to posts object", () => {
    const posts = postsStore.state.posts;
    const postsLengthBeforeSet = Object.values(posts).length;
    mutations.setPost(postsStore.state, {
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
    const threadPosts = rootStore.state.threads[threadId].posts;
    const threadPostsBeforeSet = Object.values(threadPosts).length;
    mutations.appendPostToThread(postsStore.state, {
      postId: "greatPost" + Math.random(),
      threadId,
      rootState: rootStore.state
    });
    const threadPostsAfterSet = Object.values(threadPosts).length;
    expect(threadPostsBeforeSet < threadPostsAfterSet).toBe(true);
  });
});

describe("appendPostToUser", () => {
  test("adds post to users object", () => {
    const userId = "jUjmgCurRRdzayqbRMO7aTG9X1G2";
    const userPosts = usersStore.state.users[userId].posts;
    const userPostsBeforeSet = Object.values(userPosts).length;
    mutations.appendPostToUser(postsStore.state, {
      postId: "greatPost" + Math.random(),
      userId,
      rootState: rootStore.state
    });
    const userPostsAfterSet = Object.values(userPosts).length;
    expect(userPostsBeforeSet < userPostsAfterSet).toBe(true);
  });
});
