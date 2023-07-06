<script setup>
import { ref, onMounted } from 'vue'
import { ModalsContainer } from 'vue-final-modal'
import NavbarDashboard from '../components/NavbarDashboard.vue';
import SectionRegister from '../components/SectionRegister.vue';

const token = ref('token');
const user = ref('user');

onMounted(() => {
  if(!user.value && !token.value) {
    window.location.href = '/login';
  }
});

</script>

<template> 
    <div v-if="user !== '' && token !== ''">
        <NavbarDashboard />
        <ModalsContainer />
        <SectionRegister />
    </div>
</template>
