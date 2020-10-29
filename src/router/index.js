//vue-router 4.0配置
import {createRouter,createWebHistory} from "vue-router"

const Home = () => import('views/home/Home.vue')
const Category = () => import('views/category/Category.vue')
const ShopCart = () => import('views/shopcart/ShopCart.vue')
const Profile = () => import('views/profile/Profile')
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component:Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcart',
    component: ShopCart
  },
  {
    path: '/profile',
    component: Profile
  }
]

const history = createWebHistory()

const router = createRouter({
  routes,
  history
})

export default router
