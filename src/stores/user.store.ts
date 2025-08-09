import { defineStore } from "pinia";
import type { IUser } from "@/interface/user.interface.ts";
import { signOut, } from "firebase/auth";
import { auth } from "@/firebase/config";
// import { useRouter } from "vue-router";
import { router } from "@/router";
import { nextTick } from "vue";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: null as IUser | null,
    }),
    getters: {
        getUser(state) {
            return state.user;
        },
    },
    actions: {
        setUser(user: IUser) {
            this.user = user;
        },

        async handleLogout() {
            try {
                await nextTick(); // Ensure the DOM is updated before proceeding
                await signOut(auth);
                this.user = null;

                router.push("/"); // Redirect to home after logout
                document.body.style.overflow = "auto";

            } catch (error) {
                console.error("Error logging out:", error);
            }
        }
    },
    persist: true
});
