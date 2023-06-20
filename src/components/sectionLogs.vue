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
  <div>
    <div class="mt-10">
      <div class="flex w-full justify-start">
        <Button @click="openAdd"
          class="border border-black p-2 cursor-pointer hover:bg-black hover:text-white transition duration-200">
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
