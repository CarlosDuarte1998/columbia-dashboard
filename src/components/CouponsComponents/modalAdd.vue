<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { defineProps, defineEmits, ref, onMounted } from 'vue'
import { useCountryStore } from '@/stores/country'
import Swal from 'sweetalert2/dist/sweetalert2';
import { useCouponsStore } from '@/stores/coupons'

defineProps({});

const emit = defineEmits(['confirm']);
let code = ref('');  
let startFormatted = '';
let endFormatted = '';
let status = ref('');  


// Obtencion de datos de fechas*

const dateRange = ref({ start: new Date(), end: new Date() });
const handleDate = (modelData, property) => {
  dateRange.value[property] = modelData;
  const startDate = dateRange.value.start;
  const endDate = dateRange.value.end;
  startFormatted = startDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
  endFormatted = endDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
};



// Obtención de países desde el almacén

const countryStore = useCountryStore();
const countries = ref([]);
onMounted(async () => {
  await countryStore.getCountries();
  countries.value = countryStore.countries;
  handleDate(dateRange.value.start, 'start');
  handleDate(dateRange.value.end, 'end');
});


// Envios de datos de cupones desde al almacén


const storeCoupons = useCouponsStore();
const addCoupon = async () => {
  try {
    await storeCoupons.addCoupon({
      code: code.value,
      start_date: startFormatted,
      end_date: endFormatted,
      status: status.value,
    });
    emit('confirm');
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  } catch (error) {
    console.log('Error al agregar el cupón:', error);
  }
};
</script>
<template>
  <VueFinalModal class="coupon-modal" content-class="coupon-modal-content" overlay-transition="vfm-fade"
    content-transition="vfm-fade" :click-to-close="false">
    <section class="bg-white 0">
      <div class="">
        <h2 class="mb-4 text-2xl font-gerttb text-gray-900">Añadir nuevo cupon</h2>
        <form action="#">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="sm:col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Código del cupón
              </label>
              <input type="text" name="code" id="code" v-model="code"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="BETHEGOAT2023" required="" />
            </div>
            <div class="w-full">
              <label for="brand" class="block mb-2 text-sm font-medium text-gray-900">Fecha de inicio</label>
              <VueDatePicker :teleport="true" teleport-center :model-value="dateRange.start" time-picker-inline
                :is-24="false" @update:model-value="modelData => handleDate(modelData, 'start')" />
            </div>
            <div class="w-full">
              <label for="price" class="block mb-2 text-sm font-medium text-gray-900">Fecha de fin</label>
              <VueDatePicker :teleport="true" teleport-center :model-value="dateRange.end" time-picker-inline
                :is-24="false" @update:model-value="modelData => handleDate(modelData, 'end')" />
            </div>
            <div>
              <label for="status" class="block mb-2 text-sm font-medium text-gray-900">Estado</label>
            <div class="flex items-center">
              <select id="status"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 mr-4" required v-model="status" >
                <option selected="" disabled>Seleciona el estado</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
            </div>
          </div>
          <div class="flex w-full justify-end items-center mt-8">
            <span @click="emit('confirm')" class="bg-red-600 p-2 rounded-md cursor-pointer text-white">
              Cancelar
            </span>
            <button @click="addCoupon" class="bg-green-600 ml-2 p-2 rounded-md text-white cursor-pointer">
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
