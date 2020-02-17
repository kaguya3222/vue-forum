<template>
  <div class="col-full col-full_centered">
    <h1 class="col-full__header col-full__header_size_l">
      Not found
    </h1>
    <p class="col-full__text col-full__text_size_l">
      Ooops! We couldn't find what you are looking for.
    </p>
    <p class="col-full__text col-full__text_size_l">
      <router-link :to="{ name: 'Home' }">Back to Home Page</router-link>
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.default-text {
  color: #4e9c7f;
}

.col-full__header_size_l {
  font-size: 100px;
}

.col-full__text_size_l {
  font-size: 50px;
  font-weight: 100;
}

.col-full_centered {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
</style>
