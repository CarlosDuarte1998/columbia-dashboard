<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { defineProps, defineEmits, ref } from 'vue'

defineProps({
 
});
const emit = defineEmits(['confirm']);

/*Obtencion y manejo del DatePicker*/
const date = ref(new Date());

const handleDate = (modelData) => {
    const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    date.value = modelData;
    console.log(date.value.toLocaleDateString('es-ES', options));
};


</script>
<template>
  <VueFinalModal class="coupon-modal" content-class="coupon-modal-content" overlay-transition="vfm-fade"
    content-transition="vfm-fade" :click-to-close="false">
    <section class="bg-white 0">
      <div class="">
        <h2 class="mb-4 text-2xl font-gerttb text-gray-900">Añadir nueva bitacora</h2>
        <form action="#">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="sm:col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Competidor
              </label>
              <select id="category"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                <option selected="" disabled>Seleciona el competidor</option>
                <option value="TV">Carlos Duarte</option>
                <option value="PC">Alexander Duarte</option>
              </select>
            </div>
            <div class="w-full">
              <label for="brand" class="block mb-2 text-sm font-medium text-gray-900">Distancia</label>
              <input type="number" name="brand" id="brand"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Product brand" required="" />
            </div>
            <div class="w-full">
              <label for="price" class="block mb-2 text-sm font-medium text-gray-900">Fecha de registro</label>
              <VueDatePicker :teleport="true" teleport-center :model-value="date" time-picker-inline
              :is-24="false" @update:model-value="handleDate" />
            </div>
  
          </div>
          <div class="flex w-full justify-end items-center mt-8">
            <button @click="emit('confirm')" class="bg-red-600 p-2 rounded-md cursor-pointer text-white">
              Cancelar
            </button>
            <button type="submit" class="bg-green-600 ml-2 p-2 rounded-md text-white cursor-pointer">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </section>
  </VueFinalModal>
</template>
<style>
.coupon-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}

.coupon-modal-content {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
  width: 60%;
  padding: 30px;
}

.coupon-modal-content>*+* {
  margin: 0.5rem 0;
}

.coupon-modal-content h1 {
  font-size: 1.375rem;
}

.dark .coupon-modal-content {
  background: #000;
}
</style>
