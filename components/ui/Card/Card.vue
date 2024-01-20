<script setup lang="ts">

</script>

<template>
  <div class="card" draggable="true">
    <slot/>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--color-brand-900);
  width: 250px;
  height: 150px;
  overflow: hidden;
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  color: white;
  font-weight: bold;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  animation: show 0.3s;
  transition: all 0.2s;
  margin: 0 auto;
}

.card:hover {
  cursor: grab;
  transform: scale(1.01);
  transition: all 0.2s;
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0.5);
  opacity: 0.9;
}

@keyframes show {
  from {
    transform: scale(0.5) translateY(-30px);
    opacity: 0.4;
  }
  to {
    @apply border-transparent;
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>