import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'Recommend',
    // children: [
    //   {
    //     path: ':id',
    //     component: () => import(/* webpackChunkName: "Album" */'../views/Album.vue')
    //     // 魔术注释
    //   }
    // ],
    component: () => import(/* webpackChunkName: "Recommend" */'../views/Recommend.vue')
  },
  {
    path: '/singer',
    name: 'Singer',
    children: [
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "SingerDetail" */'../views/SingerDetail.vue')
      } 
    ],
    component: () => import(/* webpackChunkName: "Recommend" */'../views/Singer.vue')
  },
  {
    path: '/search',
    name: 'Search',
    children: [
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "SingerDetail" */'../views/SingerDetail.vue')
      }
    ],
    component: () => import(/* webpackChunkName: "Recommend" */'../views/Search.vue')
  },
  {
    path: '/toplist',
    name: 'TopList',
    // children: [
    //   {
    //     path: ':id',
    //     component: () => import(/* webpackChunkName: "Album" */'../views/Album.vue')
    //     // 魔术注释
    //   }
    // ],
    component: () => import(/* webpackChunkName: "Recommend" */'../views/TopList.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
