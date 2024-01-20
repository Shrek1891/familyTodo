<script setup lang="ts">
import {useAuthStore, useIsLoadingStore} from "~/store/auth.store";

useSeoMeta({
  title: 'Home',
});
const dragCardRef = ref(null);
const sourceColumnRef = ref(null);
const isLoadingStorage = useIsLoadingStore();
const store = useAuthStore();
const router = useRouter();
onMounted(async () => {
  try {
    const user = await account.get();
    if (user) store.set(user);
    isLoadingStorage.set(false);
  } catch (error) {
    await router.push('/logout');
    console.log(error);
  } finally {
    isLoadingStorage.set(false);
  }
})
</script>

<template>
  <div v-if="isLoadingStorage.isLoading" class="loader">
    <div class="loader">...loading</div>
  </div>
  <section v-else :class="{grid:store.isAuth}">
    <div class="sidebar">
      <LayoutSidebar v-if="store.isAuth"/>
    </div>
    <div class="slot">
      <slot/>
    </div>
  </section>
</template>

<style scoped>
.slot {
  width: 100%;
  background-color: var(--color-grey-900);
  margin-left: 200px;
}

.loader {
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-900);
  color: white;
  font-size: 45px;
}

.grid {
  width: 100%;
  height: 100dvh;
  display: flex;
}

.sidebar {
  height: 100%;
  background-color: var(--color-brand-900);
  width: 200px;
  position: fixed;
}

.loader {
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
