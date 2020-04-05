<template>
  <div id="app">
    <nav-bar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar";

export default {
  components: {
    "nav-bar": TheNavbar
  },
  beforeCreate() {
    this.$store.dispatch("users/fetchUser", {
      id: this.$store.state.users.authId
    });
  }
};
</script>

<style>
@import "./assets/css/style.css";
</style>
