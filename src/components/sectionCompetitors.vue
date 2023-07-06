<script setup>
import dataTable from './CompetitorsComponents/dataTable.vue';
import { useModal } from 'vue-final-modal'
import modalAdd from './CompetitorsComponents/modalAdd.vue';

const { open: modalAddOpen, close: modalAddClose } = useModal({
  component: modalAdd,
  attrs: {
    onConfirm() {
      modalAddClose()
    }
  },
});

</script>
<template>
    <div class="mt-8 p-4" style="width:80%; float:right;">
      <h1 class="font-bold text-2xl mt-8">Competidores</h1>
      <div class="flex w-full justify-end">
        <button @click="modalAddOpen" class="border mr-4 border-black p-2 cursor-pointer">
          Nuevo competidor
          <font-awesome-icon icon="fa-solid fa-plus" />
        </button>
      </div>
      <dataTable />
    </div>
</template>