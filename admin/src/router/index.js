import Vue from 'vue'
import VueRouter from 'vue-router'
const Main = () => import('../views/Main.vue')
const Create = () => import('../views/Cate/Create.vue')
const List = () => import('../views/Cate/List.vue')
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/cate/create',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/cate/create',
        name: 'Create',
        component: Create
      },
      {
        path: '/cate/list',
        name: 'List',
        component: List
      },
      {
        path: '/cate/edit/:id',
        component: Create,
        props: true 
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
