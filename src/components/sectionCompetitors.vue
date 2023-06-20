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
       <div>
        <div class="mt-10">
    <div class="flex w-full justify-start">
      <Button @click="modalAddOpen" class="border border-black p-2 cursor-pointer">
        Nuevo competidor
        <font-awesome-icon icon="fa-solid fa-plus" />
      </Button>
    </div>
    <div class="mt-8">
     <dataTable />
    </div>
  </div>
    </div>
</template>