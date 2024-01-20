<script setup lang="ts">

import {useQuery} from "@tanstack/vue-query";
import {DB_ID} from "~/app.constants";
import type {ICustomer} from "~/types/dealsTypes";

const columns = [{
  name: 'avatar',
  label: 'Avatar',
}, {
  name: 'name',
  label: 'Name',
}, {
  name: 'Email',
  label: 'Email',
}]
const {data, isLoading} = useQuery({
  queryKey: ['customers'],
  queryFn: () => {
    return DB.listDocuments(DB_ID, 'customers')
  },

})
const costumers = (data?.value?.documents as unknown as ICustomer[])
</script>

<template>
  <section>
    <h2
        class="title"
    >My Family</h2>
    <div v-if="isLoading">Loading...</div>
    <div class="content"
         v-else
    >
      <div

          class="column"
      >
        <div
            v-for="column in columns"
            :key="column"
        >
          <p>{{ column.label }}</p>
        </div>


      </div>
      <div
          class="rows"
      >
        <div
            class="row"
            v-for="customer in data?.documents"
            :key="customer.$id"
        >
          <NuxtLink :href="`/customers/edit/${customer.$id}`">
            <img
                :src="customer.avatar_url"
                alt=""
            />
          </NuxtLink>
          <p>{{ customer.name }}</p>
          <p>{{ customer.email }}</p>


        </div>

      </div>
    </div>


  </section>
</template>
<style scoped>
img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
h2 {
  text-align: center;
  padding: 1rem;
}
a {
  display: flex;
  justify-content: center;
  align-items: center;
}

.column {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  padding: 1rem;
}
.content {
  margin: 0 auto;
  width: 600px;

}
.row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
}

.rows {
  gap: 1rem;
  display: grid;
  padding: 1rem;
}


</style>