<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { defineProps, defineEmits, ref, onMounted } from 'vue'
import { useCountryStore } from '@/stores/country'
import Swal from 'sweetalert2/dist/sweetalert2';
import { useCouponsStore } from '@/stores/coupons'

const storeCoupons = useCouponsStore();
const emit = defineEmits(['confirm']);
let startFormatted = '';
let endFormatted = '';

const dateRange = ref({ start: new Date(), end: new Date() });
const handleDate = (modelData, property) => {
  dateRange.value[property] = modelData;
  const startDate = dateRange.value.start;
  const endDate = dateRange.value.end;
  startFormatted = startDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
  endFormatted = endDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
};

onMounted(async () => {
  handleDate(dateRange.value.start, 'start');
  handleDate(dateRange.value.end, 'end');
});
const addCoupon = async () => {
  try {
    await storeCoupons.addCoupon(data);
    emit('confirm');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cupón guardado correctamente',
      showConfirmButton: false,
      timer: 2500
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
        <form @submit.prevent="storeCoupons.addCoupon(storeCoupons.formCoupon)">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="sm:col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Código del cupón
              </label>
              <input type="text" name="code" id="code" v-model="storeCoupons.formCoupon.code"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
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
            <div class="w-full">
              <label for="status" class="block mb-2 text-sm font-medium text-gray-900">Estado</label>
              <div class="flex items-center">
                <select v-model="storeCoupons.formCoupon.status" class="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 mr-4">
                  <option selected="" disabled>Seleciona el estado</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
            </div>
          </div>
          <div class="flex w-full justify-end items-center mt-8">
            <button class="bg-red-600 p-2 rounded-md cursor-pointer text-white">
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

