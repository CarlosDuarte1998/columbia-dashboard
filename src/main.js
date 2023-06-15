import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faCompass, faEnvelope, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import './axios';

const pinia = createPinia()
pinia.use(({ store }) => {
    store.router = markRaw(router);
})

library.add(faUserSecret, faCompass, faEnvelope, faLock, faArrowRight)

const app = createApp(App)
app.use(router)
app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
