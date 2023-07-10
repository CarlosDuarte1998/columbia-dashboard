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
    <div class="mt-8 p-4" style="width:80%; float:right;">
      <h1 class="font-bold text-2xl mt-8">Registros</h1>
      <div class="flex w-full justify-end">
        <button @click="openAdd" class="border mt-1 mr-4 border-black p-2 cursor-pointer">
          <font-awesome-icon icon="fa-solid fa-plus" /> Nuevo registro
        </button>
      </div>
      <dataTable />
    </div>
</template>