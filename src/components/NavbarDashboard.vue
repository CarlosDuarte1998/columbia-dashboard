<script>
import * as Icons from '@heroicons/vue/24/solid'
import HeaderDashboard from './headerDashboard.vue'

export default {
  data() {
    return {
      activeSection: null
    }
  },
  name: 'App',
  components: {
    UserGroupIcon: Icons.UserGroupIcon,
    TicketIcon: Icons.TicketIcon,
    HeaderDashboard
  },
  methods: {
    selectSection(sectionId) {
      this.activeSection = sectionId
    }
  }
}
</script>

<template>
  <HeaderDashboard />

  <aside
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white">
      <ul class="space-y-2 font-medium">
        <li>
          <a
            href="#"
            class="flex items-center p-2 transition duration-75 text-gray-600 rounded-lg hover:bg-gray-200 hover:text-black"
            @click="selectSection('coupons')"
          >
            <TicketIcon class="flex-shrink-0 w-6 h-6" aria-hidden="true" />
            <span class="ml-3 hover:">Cupones</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            class="flex items-center p-2 transition duration-75 text-gray-600 rounded-lg hover:bg-gray-200 hover:text-black"
            @click="selectSection('competitors')"
          >
            <UserGroupIcon
              class="flex-shrink-0 w-6 h-6 transition duration-75"
              aria-hidden="true"
            />
            <span class="flex-1 ml-3 whitespace-nowrap">Competidores</span>
          </a>
        </li>

        <li>
          <a
            href="#"
            class="flex items-center transition duration-75 p-2 text-gray-600 rounded-lg hover:bg-gray-200 hover:text-black"
            @click="selectSection('logs')"
          >
            <font-awesome-icon :icon="['fas', 'compass']" class="w-5 h-5" />
            <span class="flex-1 ml-3 whitespace-nowrap">Bitacoras</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            class="flex transition duration-75 items-center p-2 text-gray-600 rounded-lg hover:bg-gray-200 hover:text-black"
            @click="selectSection('logs')"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>

  <div class="p-4 sm:ml-64">
    <div class="p-4 dark:border-gray-700 mt-14">
      <div class="grid gap-4 mb-4">
        <div id="coupons" v-show="activeSection === 'coupons'">Coupons</div>
        <div id="competitors" v-show="activeSection === 'competitors'">Competitors</div>
        <div id="logs" v-show="activeSection === 'logs'">Logs</div>
        <div id="signup" v-show="activeSection === 'signup'">Sign Up</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
