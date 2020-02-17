<template>
  <div class="col-full centered">
    <h1>Not found</h1>
    <p>
      Ooops! We couldn't find what you are looking for.
    </p>
    <p><router-link :to="{ name: 'Home' }">Back to Home Page</router-link></p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 100px;
}

p {
  font-size: 50px;
  font-weight: 100;
}

.centered {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
</style>
