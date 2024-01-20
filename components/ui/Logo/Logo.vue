<script setup lang="ts">

</script>

<template>
  <div class="logo">
    <h2 class="linear rainbow-text">Family TODO</h2>
  </div>
</template>

<style scoped>
h2 {
  letter-spacing: .2rem;
}
.rainbow-text:is(.linear) {
  background: linear-gradient(
      to right,
      var(--color-grey-0),
      var(--color-grey-100),
      var(--color-grey-300),
      var(--color-grey-400),
      var(--color-grey-500),
      var(--color-grey-600),
      var(--color-grey-700)
  );
  -webkit-background-clip: text;
  color:transparent;
  -webkit-text-fill-color: transparent;
  font-size: 2rem;
  font-family: sans-serif;
  font-weight: bold;
  display: inline !important;
}
.logo {
  margin: 1rem;
  padding: 1rem 2rem;
  background-color: var(--color-red-700);
  border-radius: 5px;
  height: 15vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  color: var(--color-grey-600);
}
</style>