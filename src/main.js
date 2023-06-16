import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCompass, faEnvelope, faLock, faArrowRight, faPlus, faXmark} from '@fortawesome/free-solid-svg-icons'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'

import './axios';

const pinia = createPinia()
pinia.use(({ store }) => {
    store.router = markRaw(router);
})

library.add( faCompass, faEnvelope, faLock, faArrowRight, faPlus, faXmark)

const app = createApp(App)
app.use(createVfm())
app.use(VueSweetalert2);
app.use(router)
app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
