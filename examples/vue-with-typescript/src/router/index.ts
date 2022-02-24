import MuxPlayerView from "@/views/MuxPlayerView.vue";
import MuxVideoView from "@/views/MuxVideoView.vue";
import MuxAudioView from "@/views/MuxAudioView.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/mux-player",
      name: "mux-player",
      component: MuxPlayerView,
    },
    {
      path: "/mux-video",
      name: "mux-video",
      component: MuxVideoView,
    },
    {
      path: "/mux-audio",
      name: "mux-audio",
      component: MuxAudioView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
