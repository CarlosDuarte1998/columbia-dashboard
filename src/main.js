import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
//eslint-disable-next-line
import axios from 'axios'
import './axios';
const pinia = createPinia()
pinia.use(({ store }) => {
    store.router = markRaw(router);
})
const app = createApp(App)
app.use(router)
app.use(pinia)


app.mount('#app')
