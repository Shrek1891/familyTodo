<script setup lang="ts">

import Card from "~/components/ui/Card/Card.vue";
import {useHomeQuery} from "~/hooks/useHomeQuery";
import dayjs from "dayjs";
import CreateCard from "~/components/ui/Home/CreateCard.vue";
import {useMutation} from "@tanstack/vue-query";
import type {EnumStatus} from "~/types/dealsTypes";
import {DB_ID} from "~/app.constants";
import type {ICard, IColumn} from "~/types/homePageTypes";
import {useDealSlideStore} from "~/store/slide";

const {data, isLoading, error, refetch} = useHomeQuery();
const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const store = useDealSlideStore()
type TypeMutationVariables = {
  docId: string
  status?: EnumStatus
}
const {mutate, isPending: isDrop} = useMutation({
  mutationKey: ['move card'],
  mutationFn: ({docId, status}: TypeMutationVariables) =>
      DB.updateDocument(DB_ID, 'deals', docId, {status}),
  onSuccess: () => refetch()
});
const handleDragStart = (card: ICard, column: IColumn) => {
  dragCardRef.value = card;
  sourceColumnRef.value = column;
}
const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
}
const handleDrop = (targetColumn: IColumn) => {
  if (dragCardRef.value && sourceColumnRef.value) {
    mutate({docId: dragCardRef.value.id, status: targetColumn.id})
  }
}

</script>

<template>
  <section class="section">
    <div v-if="isLoading">Loading...</div>
    <div
        v-else
        v-for="(column, index) in data"
        :key="index"
        class="row"
        @dragover="handleDragOver"
        @drop="handleDrop(column)"
    >
      <p
          class="row-title"
      >
        {{ column.name }}
      </p>
      <CreateCard :refetch="refetch" :status="column.id"/>
      <div class="cards">
        <div
            v-for="card in column.cards"
            :key="card.id"
        >
          <Card
              @dragstart="handleDragStart(card, column)"
              class="card-item"
          >
            <div
                type="button"
                class="name"
                @click="store.set(card)"
            >{{ card.name }}
            </div>
            <div class="costumer-name">{{ card.companyName }}</div>
            <div class="date">{{ dayjs(card.$createdAt).format('DD MMM YYYY') }}</div>
          </Card>
        </div>
      </div>
    </div>
  </section>
  <Slideover/>
</template>

<style>
h1 {
  color: black;
}

.row-title {
  color: var(--color-grey-900);
  background-color: var(--color-brand-200);
  border-radius: 25px;
  padding: 2rem 1rem;
  text-align: center;
  font-size: 2rem;
  margin: 1rem 2rem;
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0.5);
}

.date {
  color: var(--color-grey-400);
  font-size: 13px;
  font-weight: 100;
  font-style: italic;
  text-align: right;
  margin-right: 1rem;
}

.costumer-name,
.name {
  font-style: italic;
  text-align: center;
  margin-left: 1rem;
}

.name {
  cursor: help;
}

.section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 2rem;
  background-color: var(--color-grey-900)
}

.row,
.cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cards {
  position: sticky;
  overflow-y: scroll;
  height: 70vh;
}

.cards::-webkit-scrollbar {
  border-radius: 8px;
  background-color: #e7e7e7;
  border: 1px solid #cacaca;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
}

.cards::-webkit-scrollbar {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
}

.cards::-webkit-scrollbar-thumb {
  background-image: linear-gradient(#a520ca, #2681cc);
  border-radius: 10px;
}

.card-item > div {

}
</style>
