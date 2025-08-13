import type { IAuthStore, TAuthForm } from "@/interface/auth.interface";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: (): IAuthStore => ({
    selectedForm: "Login",
    isAuthVisible: false,
  }),
  getters: {
    getSelectedForm(state) {
      return state.selectedForm;
    },
  },
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
    setSeletedForm(form: TAuthForm) {
      this.selectedForm = form;
    },
  },
});
