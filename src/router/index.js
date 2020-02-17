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
    path: "/threads/:id",
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
