<script setup>
  import {onMounted} from 'vue';
  import {useAuthStore} from '../stores/auth.js';

  const authData = useAuthStore();
  onMounted(async() => {
    await authData.getAuth();

  });

</script>
<template>
   {{authData}}
</template>