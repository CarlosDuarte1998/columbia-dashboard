<script setup>
/*eslint-disable*/
import { onMounted } from 'vue';
import {useAuthStore} from '../stores/auth.js';

const example = useAuthStore();

onMounted(async() => {
  await example.getAuth();

});

</script>
<template>
<div>
    
</div>
</template>