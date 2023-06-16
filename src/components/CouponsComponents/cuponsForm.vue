<script setup>
import { useModal } from 'vue-final-modal'
import ModalComponent from './modalAdd.vue'
import dataTable from './dataTable.vue'
const { open, close } = useModal({
  component: ModalComponent,
  attrs: {
    title: 'Hello World!',
    onConfirm() {
      close()
    }
  },
});
</script>
<template>
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
</template>

<style setup>

</style>
