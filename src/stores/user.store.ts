import { defineStore } from "pinia";
import type { IUser } from "@/interface/user.interface.ts";


export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as IUser | null,
  }),
  actions: {
    setUser(user: IUser) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
  },
});
