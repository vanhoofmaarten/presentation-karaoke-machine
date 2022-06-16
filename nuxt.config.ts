import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    "@/assets/css/main.css",
    "primevue/resources/themes/bootstrap4-light-blue/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
  ],
  runtimeConfig: {
    baseUrl: "http://localhost:3001",
  },
});
