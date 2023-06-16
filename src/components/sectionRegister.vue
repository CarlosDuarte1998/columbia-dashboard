<script setup>
import dataTable from './RegisterComponents/dataTable.vue';



</script>
<template>
       <div>
        <div class="mt-10">
    <div class="flex w-full justify-start">
      <Button @click="open" class="border border-black p-2 cursor-pointer  transition duration-200">
        Nuevo registro
        <font-awesome-icon icon="fa-solid fa-plus" />
      </Button>
    </div>
    <div class="mt-8">
     <dataTable />
    </div>
  </div>
    </div>
</template>