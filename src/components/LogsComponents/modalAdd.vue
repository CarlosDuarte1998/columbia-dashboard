<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { defineProps, defineEmits, ref, onMounted } from 'vue'
import {useCompetitorStore} from '@/stores/competitor'
import {useHistoriesStore} from '@/stores/history'
import Swal from 'sweetalert2/dist/sweetalert2';

const emit = defineEmits(['confirm']);
const competitorStore = useCompetitorStore();
const storeHistories = useHistoriesStore();
onMounted(async () => {
  await competitorStore.getCompetitors()
});

/*
const addHistory = async () => {
  emit('confirm');
  try {
    if (response.status == 201){
      Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    }
    else{
      Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    }
   
   
  } catch (error) {
    console.log(error);
  }
};
*/

</script>
<template>
  <VueFinalModal class="coupon-modal" content-class="coupon-modal-content" overlay-transition="vfm-fade"
    content-transition="vfm-fade" :click-to-close="false">
    <section class="bg-white 0">
      <div class="">
        <h2 class="mb-4 text-2xl font-gerttb text-gray-900">Añadir nueva bitacora</h2>
        <form action="#" @submit.prevent="storeHistories.addHistory(storeHistories.formHistory)">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="sm:col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Competidor
              </label>
              <select v-model="storeHistories.formHistory.competitor_id" 
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                <option selected="" disabled>Seleciona el competidor</option>
                <option v-for="competitor in competitorStore.competitors" :key="competitor.id" :value=" competitor.id ">{{ competitor.name }} - {{ competitor.country.name }}</option>
              </select>
            </div>
            <div class="w-full">
              <label class="block mb-2 text-sm font-medium text-gray-900">Distancia</label>
              <input v-model="storeHistories.formHistory.distance" type="text"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
            </div>
            <div class="w-full">
              <label class="block mb-2 text-sm font-medium text-gray-900">Tiempo</label>
              <input v-model="storeHistories.formHistory.time" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
            </div>
  
          </div>
          <div class="flex w-full justify-end items-center mt-8">
            <button type="button" @click="emit('confirm')" class="bg-red-600 p-2 rounded-md cursor-pointer text-white">
              Cancelar
            </button>
            <button class="bg-green-600 ml-2 p-2 rounded-md text-white cursor-pointer">
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
