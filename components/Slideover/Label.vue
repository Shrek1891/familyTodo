<script setup lang="ts">
const props = defineProps({
  labelText: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <div class="label">
    <label
        v-if="labelText"
        class="label-text"
    >
      <p> {{ labelText }} </p>
      <div class="label-content">
        <slot/>
      </div>
    </label>
  </div>
</template>
<style scoped>
.label {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-around;
}

.label-text {
  opacity: 0.75;
  margin-bottom: 0.5rem;
}
</style>