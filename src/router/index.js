import { createRouter, createWebHistory } from 'vue-router'
import Login from '../view/LoginDash.vue'
import CompetitorDash from '../view/CompetitorDash.vue'
import NavbarDash from '../components/NavbarDashboard.vue'
// import {useAuthStore} from '../stores/auth_store.js';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
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
        requireAuth: false
      }
    },
    {
      path: '/',
      name: 'home',
      component: NavbarDash,
      meta: {
        requireAuth: false
      }
    },
  
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: Home,
    //   meta: {
    //     requireAuth: true
    //   }
    // },
  ]
})

// router.beforeEach(async(to, from, next) => {
//   const auth = useAuthStore();
//   if(to.meta.requireAuth && auth.token == null){
//     next({ name: 'login' })
//   } else {
//     next()
//   }
// });
export default router
