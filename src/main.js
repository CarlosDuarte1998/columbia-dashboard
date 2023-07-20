import { createApp, markRaw } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './axios'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import * as IconsFa from '@fortawesome/free-solid-svg-icons'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'
import 'vue3-easy-data-table/dist/style.css';



const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
})

library.add(
  IconsFa.faCompass,
  IconsFa.faEnvelope,
  IconsFa.faLock,
  IconsFa.faArrowRight,
  IconsFa.faPlus,
  IconsFa.faXmark,
  IconsFa.faUser,
  IconsFa.faEye,
  IconsFa.faPencil,
  IconsFa.faTrash,
  IconsFa.faClipboardCheck,
  IconsFa.faTicket,
  IconsFa.faPersonHiking,
  IconsFa.faLock,
  IconsFa.faCircleUser,
)

const app = createApp(App)
app.use(router)
app.use(pinia) 
app.use(createVfm())
app.use(VueSweetalert2)
app.component('VueDatePicker', VueDatePicker);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
