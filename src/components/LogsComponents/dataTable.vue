<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { onMounted, ref } from 'vue'
import { useHistoriesStore } from '@/stores/history';
import Swal from 'sweetalert2';

const historyStore = useHistoriesStore();
onMounted(async () => {
  await historyStore.getHistories();
});

/*
const deleteHistory = async (id) => {
  const result = await Swal.fire({
    title: '¿Seguro que desea eliminar?',
    text: "¡No se podrá recuperar el dato seleccionado!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#449d48',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
  })
  if (result.isConfirmed) {
  const reponse = await historyStore.deleteHistory(id)
    histories.value = historyStore.histories
   if(reponse){
    Swal.fire(
        '¡Eliminado!',
        'El dato del historial ha sido eliminado satisfactoriamente.',
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
 */

</script>
<template>
  <div >
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
        <tbody v-for="history in historyStore.hist" :key="history.id">
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-4">
                <div class="flex items-center text-black text-base font-semibold">
                  {{ history.name }}
                </div>
              </td>
              <td>{{ history.country.name }}</td>
              <td class="px-3">{{ history.history.max_distance }}</td>
              <td>{{ history.history.time }}</td>
            <td>
              <div class="font-medium flex">
                <span class="pr-3">
                  <font-awesome-icon
                    icon="fa-solid fa-pencil"
                    @click="historyStore.openModal(history)"
                    class="w-4 h-4 hover:text-black transition duration-150 cursor-pointer"
                /></span>
                <span class="pr-3">
                  <font-awesome-icon icon="fa-solid fa-trash"
                    class="w-4 h-4  hover:text-black transition duration-150 cursor-pointer" @click="deleteHistory(history.id)" /></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    
    <VueFinalModal
      v-model="historyStore.modalEdit"
      class="coupon-modal"
      content-class="coupon-modal-content"
      overlay-transition="vfm-fade"
      content-transition="vfm-fade">
        <section class="bg-white 0">
            <div class="">
                <h2 class="mb-4 text-2xl font-gerttb text-gray-900">Editar bitácora</h2>
                <form action="#">
                    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div class="sm:col-span-2">
                            <label class="block mb-2 text-sm font-medium text-gray-900">Competidor</label>
                            <select v-model="historyStore.formHistory.competitor_id"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                <option selected="" disabled>Seleciona el competidor</option>
                                <option value="TV">Carlos Duarte</option>
                                <option value="PC">Alexander Duarte</option>
                            </select>
                        </div>
                        <div class="w-full">
                            <label class="block mb-2 text-sm font-medium text-gray-900">Distancia</label>
                            <input type="text" v-model="historyStore.formHistory.distance"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        </div>
                        <div class="w-full">
                            <label class="block mb-2 text-sm font-medium text-gray-900">Fecha de registro</label>
                            <VueDatePicker :teleport="true" teleport-center :model-value="date" time-picker-inline
                                :is-24="false" @update:model-value="handleDate" />
                        </div>

                    </div>
                    <div class="flex w-full justify-end items-center mt-8">
                        <span  @click="historyStore.modalEdit=false" class="bg-red-600 p-2 rounded-md cursor-pointer text-white">
                            Cancelar
                        </span>
                        <button type="submit" class="bg-green-600 ml-2 p-2 rounded-md text-white cursor-pointer">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </VueFinalModal>
  </div>
</template>