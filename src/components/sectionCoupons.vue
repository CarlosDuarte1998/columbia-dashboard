<script setup>
import { useModal } from 'vue-final-modal'
import modalAdd from './CouponsComponents/modalAdd.vue'
import dataTable from './CouponsComponents/dataTable.vue'

const { open, close } = useModal({
  component: modalAdd, dataTable,
  attrs: {
    onConfirm() {
      close()
    }
  },
});
</script>
<template>
    <div class="mt-8 p-4" style="width:80%; float:right;">
      <h1 class="font-bold text-2xl mt-8">Cupones</h1>
      <!--<div class="flex w-full justify-end">
        <button @click="open" class="border mt-1 mr-4 border-black p-2 cursor-pointer butt">
          <font-awesome-icon icon="fa-solid fa-plus" /> Nuevo cupón
        </button>
      </div>-->
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