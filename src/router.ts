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
  {
    path: "/courses",
    component: () => import("@/pages/courses/CourseView.vue"),
    children: [
      {
        path: "",
        component: () => import("@/pages/courses/AllCourse.vue"),
      },
      {
        path: ":id",
        component: () => import("@/pages/courses/CourseDetails.vue"),
      },
    ],
  },
  { path: "/profile", component: () => import("./pages/profile.vue") },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
