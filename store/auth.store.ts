import {defineStore} from "pinia";

interface AuthStore {
    email: string;
    status: boolean;
    name: string;

}

const defaultValue: { user: AuthStore } = {
    user: {
        email: '',
        status: false,
        name: '',
    }
}

export const useAuthStore = defineStore('auth', {
    state: () => defaultValue,
    getters: {
        isAuth: (state) => state.user.status
    },
    actions: {
        clear() {
            this.$patch(defaultValue)
        },
        set(input: AuthStore) {
            this.$patch({user: input})
        }

    }

})

export const useIsLoadingStore = defineStore('isLoading', {
    state: () => ({
        isLoading: true,
    }),
    actions: {
        set(data: boolean) {
            this.$patch({isLoading: data})
        }
    }
})