import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthVisible: false as boolean,
  }),
  actions: {
    showAuth() {
      this.isAuthVisible = true;
        document.body.style.overflow = "hidden"; // Prevent scrolling when auth modal is open
    },
    hideAuth() {
      this.isAuthVisible = false;
      document.body.style.overflow = "";
    },
    toggleAuth() {
      this.isAuthVisible = !this.isAuthVisible;
    },
  },
});