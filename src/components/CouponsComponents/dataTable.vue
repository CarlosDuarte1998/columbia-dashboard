<script setup>
import modalEdit from './modalEdit.vue'
import { VueFinalModal } from 'vue-final-modal'
import { useCouponsStore } from '@/stores/coupons'
import { useCountryStore } from '@/stores/country'
import { onMounted, ref } from 'vue'
import Swal from 'sweetalert2/dist/sweetalert2'

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

const couponsStore = useCouponsStore()
const countryStore = useCountryStore()
onMounted(async () => {
  await couponsStore.getCoupons()
  await countryStore.getCountries()
  handleDate(dateRange.value.start, 'start');
  handleDate(dateRange.value.end, 'end');
})

</script>
<template>
  <div class="mt-2 p-4">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs border-b text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr class="pl-3">
            <th scope="col" class="px-6 py-3">Código</th>
            <th scope="col" class="px-6 py-3">Fecha de inicio</th>
            <th scope="col" class="px-6 py-3">Fecha de fin</th>
            <th scope="col" class="px-6 py-3">Estado</th>
            <th scope="col" class="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody v-for="coupon in couponsStore.coupons" :key="coupon.id">
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <div class="">
                <div class="text-base font-semibold text-code">{{ coupon.code }}</div>
              </div>
            </th>
            <td class="px-6 py-4">{{ coupon.start_date }}</td>
            <td class="px-6 py-4">{{ coupon.end_date }}</td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div
                  v-if="coupon.status === 'Activo'"
                  class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"
                ></div>
                <span v-if="coupon.status === 'Activo'">Activo</span>
                <div
                  v-if="coupon.status === 'Inactivo'"
                  class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"
                ></div>
                <span v-if="coupon.status === 'Inactivo'">Cerrado</span>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="font-medium flex">
                <span class="pr-3">
                  <font-awesome-icon
                    icon="fa-solid fa-pencil"
                    @click="couponsStore.openModal(coupon)"
                    class="w-4 h-4 hover:text-black transition duration-150 cursor-pointer"
                /></span>
                <!--<span class="pr-3">
                <font-awesome-icon icon="fa-solid fa-trash" class="w-4 h-4 hover:text-black transition duration-150 cursor-pointer" @click="deleteCoupon(coupon.id)" />
              </span>-->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <VueFinalModal
      v-model="couponsStore.showModal"
      class="coupon-modal"
      content-class="coupon-modal-content"
      overlay-transition="vfm-fade"
      content-transition="vfm-fade"
    >
      <section class="bg-white 0">
        <div class="">
          <h2 class="mb-4 text-2xl font-gerttb text-gray-900">Añadir nuevo cupon</h2>
          <form @submit.prevent="couponsStore.addCoupon(couponsStore.formCoupon)">
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div class="sm:col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900"
                  >Código del cupón
                </label>
                <input
                  type="text"
                  name="code"
                  id="code"
                  v-model="couponsStore.formCoupon.code"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              <div class="w-full">
                <label for="brand" class="block mb-2 text-sm font-medium text-gray-900"
                  >Fecha de inicio</label
                >
                <VueDatePicker
                  :teleport="true"
                  teleport-center
                  :model-value="dateRange.start"
                  time-picker-inline
                  :is-24="false"
                  @update:model-value="(modelData) => handleDate(modelData, 'start')"
                />
              </div>
              <div class="w-full">
                <label for="price" class="block mb-2 text-sm font-medium text-gray-900"
                  >Fecha de fin</label
                >
                <VueDatePicker
                  :teleport="true"
                  teleport-center
                  :model-value="dateRange.end"
                  time-picker-inline
                  :is-24="false"
                  @update:model-value="(modelData) => handleDate(modelData, 'end')"
                />
              </div>
              <div class="w-full">
                <label for="status" class="block mb-2 text-sm font-medium text-gray-900"
                  >Estado</label
                >
                <div class="flex items-center">
                  <select
                    v-model="couponsStore.formCoupon.status"
                    class="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 mr-4"
                  >
                    <option selected="" disabled>Seleciona el estado</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="flex w-full justify-end items-center mt-8">
              <button type="button" @click="couponsStore.showModal=false" class="bg-red-600 p-2 rounded-md cursor-pointer text-white">Cancelar</button>
              <button class="bg-green-600 ml-2 p-2 rounded-md text-white cursor-pointer">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </section>
    </VueFinalModal>
  </div>
</template>
