<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { defineProps, defineEmits, ref, onMounted } from 'vue'
import {useCompetitorStore} from '@/stores/competitor'
import {useHistoriesStore} from '@/stores/history'
import Swal from 'sweetalert2/dist/sweetalert2';

defineProps({
});
const emit = defineEmits(['confirm']);



const competitorStore = useCompetitorStore();
const competitors = ref([]);

onMounted(async () => {
  await competitorStore.getCompetitors()
  competitors.value = competitorStore.competitors
});

// Envios de datos de datos al almacén si la respuesta es exotosa se abre la alerta se hata con .then y syntaxis de async await
let competitor = ref('');
let distance = ref('');
let time = ref('');

const storeHistories = useHistoriesStore();
const addHistory = async () => {
  emit('confirm');
  try {
  const response =  await storeHistories.addHistory({
      competitor_id: competitor.value,
      distance: distance.value,
      time: time.value,
    });

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



</script>
<template>
  <VueFinalModal class="coupon-modal" content-class="coupon-modal-content" overlay-transition="vfm-fade"
    content-transition="vfm-fade" :click-to-close="false">
    <section class="bg-white 0">
      <div class="">
        <h2 class="mb-4 text-2xl font-gerttb text-gray-900">Añadir nueva bitacora</h2>
        <form action="#" @submit.prevent="addHistory">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="sm:col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Competidor
              </label>
              <select id="category"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required v-model="competitor">
                <option selected="" disabled>Seleciona el competidor</option>
                <option v-for="competitor in competitors" :key="competitor.id" :value=" competitor.id ">{{ competitor.name }} - {{ competitor.countries[0].name }}</option>
              </select>
            </div>
            <div class="w-full">
              <label for="brand" class="block mb-2 text-sm font-medium text-gray-900">Distancia</label>
              <input type="number" name="distance" id="distance"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="20 m" required="" v-model="distance" />
            </div>
            <div class="w-full">
              <label for="price" class="block mb-2 text-sm font-medium text-gray-900">Tiempo</label>
              <input type="number" name="time" id="time"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="2 horas" required="" v-model="time" />
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
