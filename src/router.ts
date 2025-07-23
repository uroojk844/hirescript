import { createMemoryHistory, createRouter } from "vue-router";
import Home from "./pages/home.vue";
import Job from "./pages/jobs/job.vue";

const routes = [
  { path: "/", component: Job },
  {
    path: "/jobs/:id",
    component: Job,
  },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
