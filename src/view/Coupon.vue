<script setup>
import { ref, onMounted } from 'vue'
import { ModalsContainer } from 'vue-final-modal'
import NavbarDashboard from '../components/NavbarDashboard.vue'

const token = ref('token');
const user = ref('user');

onMounted(() => {
  if(!user.value && !token.value) {
    window.location.href = '/login';
  }
});

</script>

<template>
    <p>Cupones</p>
</template>
