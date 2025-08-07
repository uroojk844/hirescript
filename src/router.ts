import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./pages/home.vue";

const routes = [
  { path: "/", component: Home },
  {
    path: "/jobs",
    component: () => import("@/pages/jobs/JobView.vue"),
    children: [
      {
        path: "",
        component: () => import("@/pages/jobs/List.vue"),
      },
      {
        path: ":id",
        component: () => import("@/pages/jobs/job.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
