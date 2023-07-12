<script setup>
import { useModal } from 'vue-final-modal'
import modalDelete from './modalDelete.vue';
import modalEdit from './modalEdit.vue';
import {useRegisterStore} from '@/stores/register'
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2/dist/sweetalert2';

const { open: openDelete, close: closeDelete } = useModal({
  component: modalDelete,
  attrs: {
    onConfirm() {
      closeDelete()
    }
  },
});
const { open: openEdit, close: closeEdit } = useModal({
  component: modalEdit,
  attrs: {
    onConfirm() {
      closeEdit()
    }
  },
});
const registerStore = useRegisterStore();
onMounted(async () => {
  await registerStore.getRegister();
});

const deleteRegister = async (id) => {
  Swal.fire({
    title: 'Eliminar',
    text: "¡No se podrá recuperar el dato seleccionado",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#4caf50',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await registerStore.deleteRegister(id);
        Swal.fire(
          '¡Eliminado!',
          'El registro ha sido eliminado satisfactoriamente.',
          'success'
        ).then(() => {
          registerStore.getRegister();
        });
      } catch (error) {
        Swal.fire(
          '¡Error!',
          'El competidor no ha sido eliminado.',
          'error'
        );
      }
    }
  });
};

</script>
<template>
  <div class="mt-2 p-4">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr class="pl-3">
            <th scope="col" class=" px-6 py-3">Nombre</th>
            <th scope="col" class=" px-4 py-3">Correo</th>
            <th scope="col" class="">Código</th>
            <th scope="col" class="">País</th>
            <!--<th scope="col" class="">Acciones</th>-->
          </tr>
        </thead>
        <tbody v-for="register in registerStore.registers" :key="register.id">
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4">
              <div class="flex items-center text-black text-base font-semibold">
                {{ register.name  }}
              </div>
            </td>
            <td class="px-3">{{ register.email }}</td>
            <td class="text-base font-semibold">{{ register.discountcode.code }}</td>
            <td>
              <span>{{ register.countries[0].name }}</span>
            </td>
            <!--<td>
              <div class="font-medium flex">
                <span class="pr-3">
                  <font-awesome-icon icon="fa-solid fa-eye"
                    class="w-4 h-4  hover:text-black transition duration-150 cursor-pointer hidden" /></span>
                <span class="pr-3">
                  <font-awesome-icon icon="fa-solid fa-pencil"
                    class="w-4 h-4  hover:text-black transition duration-150 cursor-pointer" @click="openEdit"/></span>
                <span class="pr-3">
                  <font-awesome-icon icon="fa-solid fa-trash"
                    class="w-4 h-4  hover:text-black transition duration-150 cursor-pointer" @click="deleteRegister(register)"/></span>
              </div>
            </td>-->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>