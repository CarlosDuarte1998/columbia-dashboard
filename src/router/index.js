import { createRouter, createWebHistory } from 'vue-router'
import Login from '../view/TheLogin.vue'
import CompetitorDash from '../view/CompetitorDash.vue'
import Coupon from '../view/Coupon.vue'
import Register from '../view/Register.vue'
import History from '../view/History.vue'
import {useAuthStore} from '../stores/auth.js';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/competitor',
      name: 'competitor',
      component: CompetitorDash,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/coupons',
      name: 'coupon',
      component: Coupon,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/registers',
      name: 'register',
      component: Register,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/history',
      name: 'history',
      component: History,
      meta: {
        requireAuth: true
      }
    },
  ]
})

router.beforeEach(async(to, from, next) => {
  const auth = useAuthStore();
  if(to.meta.requireAuth && auth.token == null){
    next({ name: 'login' })
  } else {
     next()
  }
});
export default router
