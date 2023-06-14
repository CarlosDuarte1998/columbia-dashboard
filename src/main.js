import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
//eslint-disable-next-line
import axios from 'axios'

const app = createApp(App)
const pinia = createPinia()
pinia.use(({ store }) => {
    store.router = markRaw(router);
})
app.use(createPinia())
app.use(router)
app.use(pinia)


app.mount('#app')
