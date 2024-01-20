<script setup lang="ts">
import {useDealSlideStore} from "~/store/slide";
import Label from "~/components/Slideover/Label.vue";

const store = useDealSlideStore()
</script>

<template>
  <div class="top">
    <div class="about">About deal</div>
    <Label labelText="What ?">
      {{ store?.card?.name }}
    </Label>
    <Label labelText="Status">{{ store.card?.status }}</Label>
    <Label labelText="Who ?">{{ store.card?.companyName }}</Label>
  </div>
</template>

<style scoped>
.top {
  padding: 2rem;
  color: black;
  text-shadow: #1f2937 0.1em 0.1em 0.2em;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  height: 50vh;
}
.about {
  color: var(--color-grey-900);
  text-align: center;
  margin: 1rem 0;
}
</style>