import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'first',
        meta: {
          name: "第一个",
          keepAlive:false
        },
        component: () => import('@/components/first/first')
      },
      {
        path: '/second',
        name: 'second',
        meta: {
          name: "第二个",
          keepAlive:true
        },
        component: () => import('@/components/second/second')
      },
      {
        path: '/third',
        name: 'third',
        meta: {
          name: "第三个",
          keepAlive:true
        },
        component: () => import('@/components/third/third')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
