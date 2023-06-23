<script setup>
import modalEdit from './modalEdit.vue';
import { useModal } from 'vue-final-modal'
import modalDelete from './modalDelete.vue';
import { useCouponsStore } from '@/stores/coupons'
import { onMounted, ref } from 'vue';

/* Funciones de los modales*/

const { open: openEdit, close: closeEdit } = useModal({
  component: modalEdit,
  attrs: {

    onConfirm() {
      closeEdit()
    }
  },
});

const { open: openDelete, close: closeDelete } = useModal({
  component: modalDelete,
  attrs: {
    title: 'Eliminar cupón',
    prueba: 'Hola mundo',
    onConfirm() {
      closeDelete()
    }
  },
});

/* Obtencion de datos del store */  
const couponsStore = useCouponsStore();
const coupons = ref([]);

onMounted(async () => {
  await couponsStore.getCoupons();
  coupons.value = couponsStore.coupons;
});

</script>
<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr class="pl-3">
          <th scope="col" class="px-6 py-3">Código</th>
          <th scope="col" class="px-6 py-3">Fecha de inicio</th>
          <th scope="col" class="px-6 py-3">Fecha de fin</th>
          <th scope="col" class="">País</th>
          <th scope="col" class="px-6 py-3">Estado</th>
          <th scope="col" class="px-6 py-3">Acciones</th>
        </tr>
      </thead>

      <tbody v-for="coupon in coupons" :key="coupon.id">
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
            <div class="">
              <div class="text-base font-semibold text-code">{{ coupon.code }}</div>
            </div>
          </th>
          <td class="px-6 py-4">{{ coupon.start_date }}</td>
          <td class="px-6 py-4">{{coupon.end_date}}</td>
          <td>El Salvador</td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div v-if="coupon.status === 'Activo'" class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
              <span v-if="coupon.status === 'Activo'">Activo</span>
              <div v-if="coupon.status === 'Cerrado'" class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
              <span v-if="coupon.status === 'Cerrado'">Cerrado</span>
            </div>
          </td>

          <td class="px-6 py-4">
            <div class="font-medium flex">
              <span class="pr-3">
                <font-awesome-icon icon="fa-solid fa-pencil"
                  class="w-4 h-4  hover:text-black transition duration-150 cursor-pointer" @click="openEdit"
                  :key="coupon.id" /></span>
              <span class="pr-3">
                <font-awesome-icon icon="fa-solid fa-trash"
                  class="w-4 h-4  hover:text-black transition duration-150 cursor-pointer" @click="openDelete"
                  :key="coupon.id" /></span>
            </div>
          </td>
        </tr>
      </tbody>

    </table>
  </div>
</template>
