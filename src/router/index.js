import { createRouter, createWebHashHistory } from 'vue-router'


import main from "@/views/main.vue"
import introduction from "@/views/introduction.vue"
import video from "@/views/video.vue"
import ppt from "@/views/ppt.vue"



const router = createRouter({
  history: createWebHashHistory(),

  routes: [
    {
      path: '/',
      component: main,
    },
    {
      path:'/introduction',
      component:introduction,
    },
    {
      path:'/video',
      component:video,
    },
    {
      path:'/ppt',
      component:ppt,
    }
  ]
})
export default router
