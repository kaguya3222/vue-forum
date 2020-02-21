import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import AppDate from "./components/AppDate";

Vue.config.productionTip = false;
Vue.component("app-date", AppDate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
