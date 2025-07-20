import { defineNuxtRouteMiddleware } from "nuxt/app";

export default defineNuxtRouteMiddleware((to) => {
  console.log(to.name);
});
