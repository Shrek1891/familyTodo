<script setup lang="ts">
import {useDealSlideStore} from "~/store/slide";
import Top from "~/components/Slideover/Top.vue";
import Comments from "~/components/Slideover/Comments.vue";
import {cardConfig} from "~/configs/config";
import {useMutation} from "@tanstack/vue-query";
import {DB_ID} from "~/app.constants";
import {useHomeQuery} from "~/hooks/useHomeQuery";
import {ref, computed} from "vue";

const {data, error, refetch} = useHomeQuery();
const isOpen = ref(false)
const store = useDealSlideStore()
const isLocalOpen = computed({
  get: () => store.isOpen,
  set: (value) => store.isOpen = value
})
const cardId = store.card?.id || '';
const {mutate, reset, isPending} = useMutation({
  mutationKey: ['deals', cardId],
  mutationFn: () => {
    return DB.deleteDocument(DB_ID, 'deals', store.card?.id || '')
  },
  onSuccess: () => {
    refetch()
  }
})
const deleteCardHandler = () => {
  mutate()
  isOpen.value = false
}
const closeCardHandler = () => {
  isOpen.value = false
  isLocalOpen.value = true
}
</script>
<template>
  <div>
    <USlideover
        v-model="isLocalOpen"
        :ui="{
    wrapper: 'bg-black-900',
    overlay: 'bg-gray-200/10 ',
    shadow: 'shadow-lg',
    base: 'overflow-hidden rounded-2xl',
    ring: '',
    background: 'bg-blue-200',
    header: {
        background: 'bg-blue-200',
    },
    body: {
        background: 'bg-blue-200',
    },
}"
    >
      <UCard
          class="slide-card"
          :ui="cardConfig"
      >
        <template #header>
          <button
              class="close"
              @click="isLocalOpen = false">
            <Icon name="ep:close-bold" size="24"/>
          </button>
          <Top/>
          <button
              class="delete"
              @click="isOpen = true"
          >
            Delete card
          </button>
        </template>
        <Comments/>
      </UCard>
    </USlideover>
    <UModal
        v-model="isOpen"
    >
      <div class="delete-card">Are you sure you want to delete this card?</div>
      <div class="btn-group">
        <button class="btn" @click="closeCardHandler">No</button>
        <button class="btn" @click="deleteCardHandler">Yes</button>
      </div>
    </UModal>
  </div>

</template>
<style scoped>
.btn-group {
  display: flex;
  gap: 1rem;
  justify-content: space-around;
  padding: 2rem;
}

.delete-card {
  text-align: center;
  padding: 2rem;
  color: var(--color-red-700);
}

.btn {
  height: 40px;
  width: 75px;
  background-color: var(--color-grey-50);
  color: var(--color-blue-700);
  border-radius: 25px;
  padding: 2px;
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  border: none;
}

.btn:hover {
  transform: scale(1.1);
  transition: all 0.2s;
}

.close {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.delete {
  background-color: var(--color-red-700);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 auto;
  display: block;
}

.delete:hover {
  background-color: var(--color-red-800);
  transform: scale(1.05);
}

</style>