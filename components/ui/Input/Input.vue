<script setup lang="ts">


</script>

<template>
  <input class="input"/>
</template>

<style scoped>
.input {
  margin: 1rem 0;
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  line-height: 30px;
  font-size: 14px;
  border: 0;
  background: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  border-radius: 0;
  color: black;
}
.input:focus {
  border-bottom: var(--color-indigo-700) 2px solid;
}
.input:-webkit-autofill {
  background: var(--color-grey-800);
  transition: all 5000s ease-in-out;
}
</style>