<script setup lang="ts">
import {menuItems} from "~/layouts/menu.data";
import {useAuthStore, useIsLoadingStore} from "~/store/auth.store";
const store = useAuthStore();
const isLoadingStorage = useIsLoadingStore();
const router = useRouter();
const logout = async () => {
  isLoadingStorage.set(true);

  await account.deleteSession('current');
  store.clear();
  await router.push('/logout');
  isLoadingStorage.set(false);
}
</script>

<template>
  <NuxtLink
      v-for="item in menuItems"
      :key="item.name"
      :to="item.url"
      class="menu-item"
  >
    <div class="link">
            <span class="icon">
                <Icon :name="item.icon"/>
            </span>
      <span>{{ item.name }}</span>
    </div>
  </NuxtLink>
  <button class="menu-item btn" @click="logout">
            <span class="icon">
                <Icon name="material-symbols:logout"/>
            </span>
      <span>{{ 'Logout' }}</span>
  </button>
</template>

<style scoped>
.router-link-active > .link {
  color: var(--color-brand-500);

}

a, .btn {
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  color: var(--color-grey-600);
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.2rem 2.4rem;
  transition: all 0.3s;
  border-radius: 10px;
}

a:hover, .btn:hover {
  transform: scale(1.1);

}
.btn.menu-item {
  background-color: var(--color-grey-600);
  color: white;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;

}

.menu-item {
  margin: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  text-decoration: none;
}
.icon {
  display: flex;
  align-items: center;
}

.link {
  display: flex;
  gap: 10px;
  color: white;
  font-size: 1.4rem;
  font-weight: 600;
  list-style: none;
}
</style>
