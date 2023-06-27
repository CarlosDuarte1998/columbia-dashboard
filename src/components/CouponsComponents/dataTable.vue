<script setup>
import modalEdit from './modalEdit.vue';
import { useModal } from 'vue-final-modal'
import { useCouponsStore } from '@/stores/coupons'
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2/dist/sweetalert2';

/* Funciones de los modales*/

const { open: openEdit, close: closeEdit } = useModal({
  component: modalEdit,
  attrs: {
    title: null,
    onConfirm() {
      closeEdit();
    },
    
  },
});


/* Obtención de datos del store */
const couponsStore = useCouponsStore();
const coupons = ref([]);

const getCoupons = async () => {
  await couponsStore.getCoupons();
  coupons.value = couponsStore.coupons;
};

onMounted(getCoupons);

/* Eliminación de cupones */
const deleteCoupon = async (id) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'bg-green-500 p-2 text-white rounded-md',
      cancelButton: 'bg-red-500 p-2 text-white rounded-md mr-1'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Borrar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        '¡Borrado!',
        'Su registro ha sido borrado.',
        'success'
      );

      couponsStore.deleteCoupon(id);
      getCoupons();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'Tu registro está seguro :)',
        'error'
      );
    }
  });
};
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <!-- tabla y encabezados -->
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr class="pl-3">
          <th scope="col" class="px-6 py-3">Código</th>
          <th scope="col" class="px-6 py-3">Fecha de inicio</th>
          <th scope="col" class="px-6 py-3">Fecha de fin</th>
          <th scope="col" class="px-6 py-3">Estado</th>
          <th scope="col" class="px-6 py-3">Acciones</th>
        </tr>
      </thead>

      <!-- filas de la tabla -->
      <tbody v-for="coupon in coupons" :key="coupon.id">
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
              <div v-if="coupon.status === 'Activo'" class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
              <span v-if="coupon.status === 'Activo'">Activo</span>
              <div v-if="coupon.status === 'Inactivo'" class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
              <span v-if="coupon.status === 'Inactivo'">Cerrado</span>
            </div>
          </td>
          <td class="px-6 py-4">
            <div class="font-medium flex">
              <span class="pr-3">
                <font-awesome-icon icon="fa-solid fa-pencil" class="w-4 h-4 hover:text-black transition duration-150 cursor-pointer" :selectedId="coupon.id" @click="openEdit" /></span>
              <span class="pr-3">
                <font-awesome-icon icon="fa-solid fa-trash" class="w-4 h-4 hover:text-black transition duration-150 cursor-pointer" @click="deleteCoupon(coupon.id)" /></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
