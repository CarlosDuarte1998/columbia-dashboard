<script setup>
import dataTable from './LogsComponents/dataTable.vue'
import { useModal } from 'vue-final-modal'
import modalAdd from './LogsComponents/modalAdd.vue';

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
      <h1 class="font-bold text-2xl mt-8">Bitácora</h1>
      <div class="flex w-full justify-end">
        <button @click="openAdd"
          class="border mr-4 border-black p-2 cursor-pointer butt">
          <font-awesome-icon icon="fa-solid fa-plus" /> Nuevo registro en bitácora
        </button><br>
      </div>
      <dataTable />
    </div>
</template>
<style>
  .butt:hover{
    background: #000000;
    color: white;
    transition: all 0.5s;
  }
</style>
