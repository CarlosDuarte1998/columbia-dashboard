<script setup>
import { useModal } from 'vue-final-modal'
import modalAdd from './CouponsComponents/modalAdd.vue'
import dataTable from './CouponsComponents/dataTable.vue'

const { open, close } = useModal({
  component: modalAdd, dataTable,
  attrs: {
    title: 'Hello World!',
    onConfirm() {
      close()
    }
  },
});
</script>
<template>
  <div>
    <div class="mt-10">
      <div class="flex w-full justify-start">
        <Button @click="open" class="border border-black p-2 cursor-pointer">
          Nuevo cupón
          <font-awesome-icon icon="fa-solid fa-plus" />
        </Button>
      </div>
      <div class="mt-8">
        <dataTable />
      </div>
    </div>
  </div>
</template>