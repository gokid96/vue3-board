import { createRouter, createWebHistory } from 'vue-router'
import BoardList from '../views/BoardList.vue'
import BoardDetail from '../views/BoardDetail.vue'
import BoardForm from '../views/BoardForm.vue'

const routes = [
  {
    path: '/',
    redirect: '/board'
  },
  {
    path: '/board',
    name: 'BoardList',
    component: BoardList
  },
  {
    path: '/board/:id',
    name: 'BoardDetail',
    component: BoardDetail
  },
  {
    path: '/board/write',
    name: 'BoardWrite',
    component: BoardForm
  },
  {
    path: '/board/edit/:id',
    name: 'BoardEdit',
    component: BoardForm
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
