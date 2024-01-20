<script setup lang="ts">
import type {IDealFormState} from "~/types/dealsTypes";
import {useMutation} from "@tanstack/vue-query";
import {DB} from "~/utils/appwrite";
import {DB_ID} from "~/app.constants";

let isOpenForm = ref(false);

const props = defineProps({
  status: {
    type: String,
    default: ''
  }, refetch: {
    type: Function,
  },
})
const {handleSubmit, handleReset, values, defineField} = useForm<IDealFormState>({
  initialValues: {
    status: props.status,
  }
})
const [costumerName, nameAttrs] = defineField('customer.name')
const [dealName, nameDealAttrs] = defineField('name')
const {mutate, isPending} = useMutation({
  mutationKey: ['createDeal'],
  mutationFn: (data: IDealFormState) => {
    const result = {
      ...data,
      price: 0,
      customer: {
        ...data.customer,
        email: "you can here set email"
      }
    }
    return DB.createDocument(DB_ID, 'deals', ID.unique(), result)
  },
  onSuccess: () => {
    props.refetch && props.refetch();
    handleReset();
  },
  onError: (error) => {
    console.log(error)
  },
})
const onSubmit = handleSubmit((data) => {
  mutate(data)
})
</script>
<template>
  <div class="add-btn">
    <button
        type="button"
        @click="isOpenForm = !isOpenForm"
        class="btn"
    >
      <Icon
          v-if="isOpenForm"
          name="ep:arrow-up-bold"
          size="24"
      />
      <Icon
          v-else
          name="ep:plus"
          size="24"
      />
    </button>
  </div>
  <form
      v-if="isOpenForm"
      class="form"
  >
    <input
        placeholder="Deal"
        class="input"
        v-model="dealName"
        v-bind="nameDealAttrs"
        type="text"
    />
    <input
        placeholder="Name"
        class="input"
        v-model="costumerName"
        v-bind="nameAttrs"
        type="text"
    />
    <div class="btn-group">
      <button
          class="button"
          :disabled="isPending"
          type="submit"
          @click="onSubmit"
      >
        {{ isPending ? 'loading...' : 'Add' }}
      </button>
    </div>
  </form>
</template>
<style scoped>
form {
  animation: show 0.3s ease-out;
  transition: all 0.3s ease-out;
}

.btn-group {
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 50%;
}

.input {
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
  color: white;
}

.input:focus {
  border-bottom: var(--color-indigo-700) 2px solid;
}

.input:-webkit-autofill {
  background: var(--color-grey-800);
  transition: all 5000s ease-in-out;
}

.button {
  height: 40px;
  width: 75px;
  background-color: var(--color-grey-50);
  color: var(--color-blue-700);
  border-radius: 25px;
  padding: 2px;
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  border: none;
}

.button:hover {
  transform: scale(1.1);
  transition: all 0.2s;
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