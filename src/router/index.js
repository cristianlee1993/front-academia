import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EstudianteNew from '../views/EstudianteNew.vue'
import EstudianteEdit from '../views/EstudianteEdit.vue'
import EstudianteView from '../views/EstudianteView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'create',
    component: EstudianteNew
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EstudianteEdit
  },
  {
    path: '/view/:id',
    name: 'view',
    component: EstudianteView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
