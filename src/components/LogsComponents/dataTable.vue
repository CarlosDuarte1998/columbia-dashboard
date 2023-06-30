<script setup>
import { useModal } from 'vue-final-modal'
import modalEdit from './modalEdit.vue';
import { ref, onMounted } from 'vue';
import { useHistoriesStore } from '@/stores/history';
import Swal from 'sweetalert2';


const { open: openEdit, close: closeEdit } = useModal({
  component: modalEdit,
  attrs: {
    onConfirm() {
      closeEdit()
    }
  },
});

// Obtención de bitacora desde el almacén

const historyStore = useHistoriesStore();
const histories = ref([]);

onMounted(async () => {
  await historyStore.getHistories()
  histories.value = historyStore.histories
});

// Se realiza la pregunta con swal para confirmar la eliminación de la bitacora y si confirma se envia el id al stores

const deleteHistory = async (id) => {
  console.log(id)
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#449d48',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Sí, bórralo!',
    cancelButtonText: 'Cancelar'
  })
  if (result.isConfirmed) {
  const reponse = await historyStore.deleteHistory(id)
    histories.value = historyStore.histories
   if(reponse){
    Swal.fire(
      '¡Eliminado!',
      'Tu archivo ha sido eliminado.',
      'success'
    )
   }else{
    Swal.fire(
      'Error',
      'No se pudo eliminar el registro',
      'error'
    )
   }
  }else{
    Swal.fire(
      'Cancelado',
      'Tu archivo está a salvo :)',
      'error'
    )
  }
};



</script>
<template>
  <div class="mt-8">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr class="pl-3">
            <th scope="col" class=" px-6 py-3">Competidor</th>
            <th scope="col" class=" px-6 py-3">País</th>
            <th scope="col" class=" px-4 py-3">Distancia</th>
            <th scope="col" class="">time</th>
            <th scope="col" class="">Acciones</th>
          </tr>
        </thead>
        <tbody v-for="history in histories" :key="history.id">
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4">
              <div class="flex items-center text-black text-base font-semibold">
                {{ history.competitor.name }}
              </div>
            </td>
            <td class="px-3">{{ history.competitor.countries[0].name }}</td>
            <td class="px-3">{{history.distance}} m</td>

            <td>
            {{ history.time }} horas
            </td>
            <td>
              <div class="font-medium flex">
            
                <span class="pr-3">
                  <font-awesome-icon icon="fa-solid fa-pencil"
                    class="w-4 h-4  hover:text-black transition duration-150 cursor-pointer"   @click="openEdit"/></span>
                <span class="pr-3">
                  <font-awesome-icon icon="fa-solid fa-trash"
                    class="w-4 h-4  hover:text-black transition duration-150 cursor-pointer" @click="deleteHistory(history.id)" /></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>