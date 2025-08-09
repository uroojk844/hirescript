import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./pages/home.vue";
import { useUserStore } from "@/stores/user.store";

const routes = [
  { path: "/", component: Home , name: "home" },
  {
    path: "/jobs",
    component: () => import("@/pages/jobs/JobView.vue"),
    children: [
      {
        path: "",
        component: () => import("@/pages/jobs/List.vue"),
      },
      {
        path: "category/:category",
        component: () => import("@/pages/jobs/category.vue"),
      },
      {
        path: "/jobs/search/:params(.*)*",
        component: () => import("@/pages/jobs/search.vue"),
      },
      {
        path: ":id",
        component: () => import("@/pages/jobs/job.vue"),
      },
    ],
  },
  { path: "/profile", component: () => import("./pages/profile.vue") ,meta: { requiresAuth: true } },
];



export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  
  if (to.meta.requiresAuth && !userStore.user) {
    // No user found → redirect to home (or login)
    return next("/");
  }

  next();
});
