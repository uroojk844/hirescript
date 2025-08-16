import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./pages/home.vue";
import { useUserStore } from "@/stores/user.store";
import Privacy from "./pages/Policies/Privacy.vue";
import TermsUse from "./pages/Policies/TermsUse.vue";
import NotFound from "./components/NotFound.vue";

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
  // {
  //   path: "/courses",
  //   component: () => import("@/pages/courses/CourseView.vue"),
  //   children: [
  //     {
  //       path: "",
  //       component: () => import("@/pages/courses/AllCourse.vue"),
  //     },
  //     {
  //       path: ":id",
  //       component: () => import("@/pages/courses/CourseDetails.vue"),
  //     },
  //   ],
  // },
  { path: "/profile", component: () => import("./pages/profile.vue") ,meta: { requiresAuth: true } },
  { path: "/privacy", component : Privacy , name:"privacy"},
  { path: "/use" , component : TermsUse , name:"use"},
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];



export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.user) {
    next("/"); // redirect to home or login
  } else {
    next();
  }
});

