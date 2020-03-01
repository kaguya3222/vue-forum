import Vue from "vue";

export default {
  setUser(state, { user, userId }) {
    Vue.set(state.users, userId, user);
  }
};
