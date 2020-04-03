import Vue from "vue";
import firebase from "firebase";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import AppDate from "./components/AppDate";

Vue.config.productionTip = false;
Vue.component("app-date", AppDate);

const firebaseConfig = {
  apiKey: "AIzaSyC5-pR1GgnFtdkImT9F-LKxQ9BrtAjc488",
  authDomain: "vue-forum-a237f.firebaseapp.com",
  databaseURL: "https://vue-forum-a237f.firebaseio.com",
  projectId: "vue-forum-a237f",
  storageBucket: "vue-forum-a237f.appspot.com",
  messagingSenderId: "630364465710",
  appId: "1:630364465710:web:57bad9757fbe78707c8dbf"
};
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
