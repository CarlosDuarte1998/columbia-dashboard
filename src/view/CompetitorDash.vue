<script>
import { ModalsContainer } from 'vue-final-modal'
import NavbarDashboard from '../components/NavbarDashboard.vue'

export default {
  data() {
    return {
      activeSection: 'coupons'
    }
  },
  name: 'App',
  components: {
    ModalsContainer,
    NavbarDashboard
  },
  methods: {
}
}
</script>

<template>
  <div>
    <NavbarDashboard />
    <ModalsContainer />
  </div>
</template>
