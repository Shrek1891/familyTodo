<script setup lang="ts">
import {useAuthStore, useIsLoadingStore} from "~/store/auth.store";
import {account} from "~/utils/appwrite";

useHead({
  title: 'Logout',
})

const loginRef = ref('');
const passwordRef = ref('');
const nameRef = ref('');

const isLoadingStorage = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

const login = async (event: Event) => {
  event.preventDefault();
  await account.createEmailSession(loginRef.value, passwordRef.value);
  const response = await account.get();
  if (response) {
    authStore.set({
      email: response.email,
      status: true,
      name: response.name
    })
    isLoadingStorage.set(false);
    await router.push('/');
  }
}

const register = async () => {
  await account.create(ID.unique(), loginRef.value, passwordRef.value, nameRef.value);
  await login();
}
</script>

<template>
  <div class="logout">
    <div class="logout-item">
      <p>Login</p>
      <form>
        <input
            v-model="nameRef"
            type="text"
            class="form__field"
            placeholder="Name"
            name="name"
            id='name'
            required/>
        <input
            v-model="loginRef"
            type="email"
            class="form__field"
            placeholder="Email"
            name="email" id='email'
            required/>
        <input
            v-model="passwordRef"
            type="password"
            class="form__field"
            placeholder="Password"
            name="password"
            id='password'
            required/>
        <div class="buttons">
          <button
              type="submit"
              @click="login"
          >Login
          </button>
          <button
              type="submit"
              @click="register"
          >Register</button>
        </div>

      </form>
    </div>


  </div>
</template>

<style scoped>
form {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
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

.buttons {
  margin-top: 15px;
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.logout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}

.logout-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  color: white;
  border-radius: 25px;
  background: var(--color-grey-800);
  padding: 4rem;
  width: 40%;
}
</style>