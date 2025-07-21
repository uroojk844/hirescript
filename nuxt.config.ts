export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  tailwindcss: {
    exposeConfig: true,
  },
  css: ["~/assets/css/main.css"],
  modules: ["@pinia/nuxt", "@nuxt/icon", "@nuxtjs/tailwindcss"],
});
