<script setup>
import dataTable from './RegisterComponents/dataTable.vue';
import { useModal } from 'vue-final-modal'
import modalAdd from './RegisterComponents/modalAdd.vue';

const { open: openAdd, close: closeAdd } = useModal({
  component: modalAdd,
  attrs: {
    onConfirm() {
      closeAdd()
    }
  },
});

</script>
<template>
       <div>
        <div class="mt-10">
    <div class="flex w-full justify-start">
      <button @click="openAdd" class="border border-black p-2 cursor-pointer  transition duration-200">
        Nuevo registro
        <font-awesome-icon icon="fa-solid fa-plus" />
      </button>
    </div>
    <div class="mt-8">
     <dataTable />
    </div>
  </div>
    </div>
</template>