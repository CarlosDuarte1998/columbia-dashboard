<script>
import HeaderDashboard from './HeaderDashboard.vue'
import sectionCoupons from './sectionCoupons.vue'
import sectionCompetitors from './sectionCompetitors.vue'
import sectionLogs from './sectionLogs.vue'
import sectionRegister from './sectionRegister.vue'

export default {
  data() {
    return {
      activeSection: 'coupons'
    }
  },
  name: 'App',
  components: {
    HeaderDashboard,
    sectionCoupons,
    sectionCompetitors,
    sectionLogs,
    sectionRegister
  },
  methods: {
    selectSection(sectionId) {
      this.activeSection = sectionId
    }
  }
}
</script>

<template>
  <div>
    <HeaderDashboard />

    <aside id="logo-sidebar"
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0"
      aria-label="Sidebar">
      <div class="h-full px-3 pb-4 overflow-y-auto bg-white">
        <ul class="space-y-2 font-medium">
          <li>
            <a href="#"
              class="flex items-center p-2 transition duration-75 text-gray-600 rounded-lg hover:text-white hover:bg-black"
              @click="selectSection('coupons')"
              :class="{'bg-black': activeSection === 'coupons', 'text-white': activeSection === 'coupons'}"
              >
              <font-awesome-icon icon="fa-solid fa-ticket" class="flex-shrink-0 w-6 h-6"/>
              <span class="ml-3">Cupones</span>
            </a>
          </li>
          <li>
            <a href="#"
              class="flex items-center p-2 transition duration-75 text-gray-600 rounded-lg hover:text-white hover:bg-black"
              :class="{'bg-black': activeSection === 'competitors', 'text-white': activeSection === 'competitors'}"
              @click="selectSection('competitors')">
              <font-awesome-icon icon="fa-solid fa-person-hiking" class="flex-shrink-0 w-6 h-6"/>
              <span class="flex-1 ml-3 whitespace-nowrap">Competidores</span>
            </a>
          </li>

          <li>
            <a href="#"
              class="flex items-center transition duration-75 p-2 text-gray-600 rounded-lg hover:text-white hover:bg-black"
              @click="selectSection('logs')"
              :class="{'bg-black': activeSection === 'logs', 'text-white': activeSection === 'logs'}"
              >
              <font-awesome-icon :icon="['fas', 'compass']" class="w-5 h-5" />
              <span class="flex-1 ml-3 whitespace-nowrap">Bitacoras</span>
            </a>
          </li>
          <li>
            <a href="#"
              class="flex items-center transition duration-75 p-2 text-gray-600 rounded-lg hover:text-white hover:bg-black"
              @click="selectSection('registro')"
              :class="{'bg-black': activeSection === 'registro', 'text-white': activeSection === 'registro'}"
              >
              <font-awesome-icon icon="fa-solid fa-clipboard-check" class="w-5 h-5" />
              <span class="flex-1 ml-3 whitespace-nowrap">Registros</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
    <div class="p-4 sm:ml-64">
      <div class="p-4 dark:border-gray-700 mt-14">
        <div class="grid gap-4 mb-4">
          <div class="" id="coupons" v-show="activeSection === 'coupons'">
            <sectionCoupons />
          </div>
          <div id="competitors" v-show="activeSection === 'competitors'">
            <sectionCompetitors />
          </div>
          <div id="logs" v-show="activeSection === 'logs'">
            <sectionLogs />
          </div>
          <div class="" id="registro" v-show="activeSection === 'registro'">
            <sectionRegister />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
