<script setup>
import { ref } from 'vue';
import HeaderDashboard from './HeaderDashboard.vue';
import sectionCoupons from './sectionCoupons.vue';
import sectionCompetitors from './sectionCompetitors.vue';
import sectionLogs from './sectionLogs.vue';
import sectionRegister from './sectionRegister.vue';



const activeSection = ref('coupons');

const selectSection = (sectionId) => {
  activeSection.value = sectionId;
};

let user = JSON.parse(localStorage.getItem('user'));



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
            <a 
              class="flex items-center p-2 mb-4 transition duration-75 text-black rounded-lg"
              >
              <font-awesome-icon icon="fa-solid fa-circle-user" class="flex-shrink-0 w-6 h-6"/>
              <span class="ml-3 span-user-name">{{ user.name}}</span>
            </a>
          </li>
          <li>
            <router-link active-class="active" to="/coupons"
              class="flex items-center p-2 transition duration-75 text-gray-600 rounded-lg hover:text-white hover:bg-black"
              >
              <font-awesome-icon icon="fa-solid fa-ticket" class="flex-shrink-0 w-6 h-6"/>
              <span class="ml-3">Cupones</span>
            </router-link>
          </li>
          <li>
            <router-link active-class="active" to="/competitor"
              class="flex items-center p-2 transition duration-75 text-gray-600 rounded-lg hover:text-white hover:bg-black"
            >
              <font-awesome-icon icon="fa-solid fa-person-hiking" class="flex-shrink-0 w-6 h-6"/>
              <span class="flex-1 ml-3 whitespace-nowrap">Competidores</span>
            </router-link>
          </li>

          <li>
            <router-link active-class="active" to="/history"
              class="flex items-center transition duration-75 p-2 text-gray-600 rounded-lg hover:text-white hover:bg-black"
              >
              <font-awesome-icon :icon="['fas', 'compass']" class="w-5 h-5" />
              <span class="flex-1 ml-3 whitespace-nowrap">Bitacoras</span>
            </router-link>
          </li>
          <li>
            <router-link active-class="active" to="/registers"
              class="flex items-center transition duration-75 p-2 text-gray-600 rounded-lg hover:text-white hover:bg-black"
              >
              <font-awesome-icon icon="fa-solid fa-clipboard-check" class="w-5 h-5" />
              <span class="flex-1 ml-3 whitespace-nowrap">Registros</span>
            </router-link>
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

<style scoped>
.span-user-name{
  font-size: 1.3rem !important;
}
.active{
  background: #000000;
  color: white;
}

</style>
