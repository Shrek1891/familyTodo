// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: false},
    css: ['~/assets/css/main.css'],
    modules: [
        '@nuxt/ui',
        'nuxt-icon',
        '@pinia/nuxt',
        ['@vee-validate/nuxt', {
            autoImports: true
        }],


    ],
    pinia: {
        storesDirs: ['~/store/**']
    },
})
