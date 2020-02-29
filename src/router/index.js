import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/PageHome")
  },
  {
    path: "/me",
    name: "Profile",
    component: () => import("@/pages/PageProfile")
  },
  {
    path: "/category/:id",
    name: "Category",
    component: () => import("@/pages/PageCategory"),
    props: true
  },
  {
    path: "/forum/:id",
    name: "Forum",
    component: () => import("@/pages/PageForum"),
    props: true
  },
  {
    path: "/threads/:threadId",
    name: "ThreadShow",
    component: () => import("@/pages/PageThreadShow"),
    props: true
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import("@/pages/PageNotFound")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
