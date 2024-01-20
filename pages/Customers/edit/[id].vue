<script setup lang="ts">

import {DB_ID} from "~/app.constants";
import {DB} from "~/utils/appwrite";
import {useMutation, useQuery} from "@tanstack/vue-query";
import type {ICustomerFormState, InputFileEvent} from "~/types/homePageTypes";

const route = useRoute();
const customerId = route.params.id as string;
const {handleSubmit, defineField, setFieldValue, setValues, values} = useForm<ICustomerFormState>()
const {data, isSuccess} = useQuery({
  queryKey: ['get customer', customerId],
  queryFn: () => DB.getDocument(DB_ID, 'customers', customerId)
})
watch(isSuccess, () => {
  const initialData = data.value as unknown as ICustomerFormState
  setValues(
      {
        avatar_url: initialData.avatar_url,
        name: initialData.name,
        email: initialData.email
      })
})
const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const {mutate, isPending} = useMutation({
  mutationKey: ['update customer', customerId],
  mutationFn: (data: ICustomerFormState) => {
    return DB.updateDocument(DB_ID, 'customers', customerId, data)
  },
  onSuccess: () => {
    navigateTo('/')
  }

})
const onSubmit = handleSubmit((values) => {
  mutate(values)
})
const {mutate: uploadImage, isPending: isUploadPending} = useMutation({
  mutationKey: ['upload image'],
  mutationFn: (file: File) => {
    return storage.createFile('storage', ID.unique(), file)
  },
  onSuccess: (data) => {
    const response = storage.getFilePreview('storage', data.$id)
    setFieldValue('avatar_url', response.href)
  }
})
</script>

<template>
  <div class="edit">
    <h2 class="title">
      Edit {{ data?.name }}
    </h2>
    <form
        class="form"
        @submit="onSubmit"
    >
      <img
          v-if="values.avatar_url || isUploadPending"
          :src="values.avatar_url"
          alt="avatar"
      >
      <input
          v-model="name"
          type="text"
          name="name"
          placeholder="Name"
          v-bind="nameAttrs"
      >
      <input
          v-model="email"
          type="text"
          name="email"
          placeholder="Email"
          v-bind="emailAttrs"
      >
      <div class="loadFile">
        <label>load new avatar
          <input
              type="file"
              :onchange="(e:InputFileEvent) => e?.target?.files?.length && uploadImage(e.target.files[0])"
              :disabled="isUploadPending"
          />
        </label>
      </div>
      <div class="buttons">
        <button
            type="submit"
            :disabled="isPending"
        >
          {{ isPending ? 'loading...' : 'Save' }}
        </button>
        <button
            type="button"
            @click="navigateTo('/customers')"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
<style scoped>
form {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 640px;
}

label {
  margin: 1rem;
}

input {
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
}

input::placeholder {
  text-align: center;
}

.loadFile {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

input:focus {
  border-bottom: var(--color-indigo-700) 2px solid;
}

input:-webkit-autofill {
  background: var(--color-grey-800);
  transition: all 5000s ease-in-out;
}

button {
  height: 40px;
  width: 75px;
  background-color: var(--color-grey-50);
  color: var(--color-blue-700);
  border-radius: 25px;
  padding: 2px;
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  border: none;
}

button:hover {
  transform: scale(1.1);
  transition: all 0.2s;
}

img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.edit {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.buttons {
  margin-top: 15px;
  display: flex;
  width: 100%;
  justify-content: space-around;
}


</style>