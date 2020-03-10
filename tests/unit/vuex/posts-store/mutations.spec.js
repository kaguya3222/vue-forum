import mutations from "../../../../src/store/modules/posts/mutations";
import mockedRootStore from "../../mocks/mockedRootStore";

const rootStore = { ...mockedRootStore };

describe("setPost", () => {
  test("adds post to posts object", () => {
    const posts = rootStore.state.forumPosts.posts;
    const postsLengthBeforeSet = Object.values(posts).length;
    mutations.setPost(rootStore.state.forumPosts, {
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
    const threadPosts = rootStore.state.forumThreads.threads[threadId].posts;
    const threadPostsBeforeSet = Object.values(threadPosts).length;
    mutations.appendPostToThread(rootStore.state.forumPosts, {
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
    const userPosts = rootStore.state.forumUsers.users[userId].posts;
    const userPostsBeforeSet = Object.values(userPosts).length;
    mutations.appendPostToUser(rootStore.state.forumPosts, {
      postId: "greatPost" + Math.random(),
      userId,
      rootState: rootStore.state
    });
    const userPostsAfterSet = Object.values(userPosts).length;
    expect(userPostsBeforeSet < userPostsAfterSet).toBe(true);
  });
});
