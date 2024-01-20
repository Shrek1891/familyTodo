<script setup lang="ts">
import Menu from "~/layouts/Menu.vue";
import Logo from "~/components/ui/Logo/Logo.vue";
</script>
<template>
  <aside>
    <NuxtLink to="/">
      <Logo/>
    </NuxtLink>
    <hr/>
    <div class="menu">
      <Menu/>
    </div>
  </aside>
</template>
<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 65vh;
  overflow: hidden;
}

hr {
  margin-top: 2rem;
}
</style>