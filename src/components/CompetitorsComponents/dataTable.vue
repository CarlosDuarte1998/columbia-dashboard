<script setup>
import { useModal } from 'vue-final-modal';
import modalEdit from './modalEdit.vue';
import { ref, onMounted } from 'vue';
import { useCompetitorStore } from '@/stores/competitor';
import Swal from 'sweetalert2/dist/sweetalert2';

const { open: modalEditOpen, close: modalEditClose } = useModal({
  component: modalEdit,
  attrs: {
    onConfirm() {
      modalEditClose()
    }
  },
});


const competitorStore = useCompetitorStore();
onMounted(async () => {
  await competitorStore.getCompetitors();
});


const deleteCompetitor = async (id) => {
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
        await competitorStore.deleteCompetitor(id);
        Swal.fire(
          '¡Eliminado!',
          'El competidor ha sido eliminado.',
          'success'
        ).then(() => {
          competitorStore.getCompetitors();
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
            <th scope="col" class=" px-4 py-3">Biografía</th>
            <th scope="col" class="">Instagram</th>
            <th scope="col" class=" px-4 py-3">Foto de perfil</th>
            <th scope="col" class=" px-4 py-3">País</th>
            <th scope="col" class=" px-4 py-3">Reto</th>
            <th scope="col" class=" px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody v-for="count in competitorStore.competitors" :key="count.id">
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4">
              <div class="flex items-center text-black text-base font-semibold">
                {{ count.name }}
              </div>
            </td>
            <td class="px-2 py-4 max-w-xs p-3">{{ count.instagram_biography }}</td>
            <td>
              {{ count.instagram_username }}
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <span v-for="img in count.images" :key="img.id">
                  <img :src="img.url" class=" w-16 h-16 " alt=""/>
                </span>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                  <span v-for="pais in count.countries" :key="pais.id">
                      {{ pais.name }}
                  </span>
              </div>
            </td>
            <td>{{count.challenge}} km</td>
            <td class="px-6 py-4">
              <div class="font-medium flex">
                <span class="pr-3">
                  <font-awesome-icon icon="fa-solid fa-eye"
                    class="w-4 h-4  hover:text-black transition duration-150 cursor-pointer" /></span>
                <span class="pr-3">
                  <font-awesome-icon icon="fa-solid fa-pencil"
                    class="w-4 h-4  hover:text-black transition duration-150 cursor-pointer"
                    @click="modalEditOpen" /></span>
                <span class="pr-3">
                  <font-awesome-icon icon="fa-solid fa-trash"
                    class="w-4 h-4  hover:text-black transition duration-150 cursor-pointer"
                    @click="deleteCompetitor(count)"/>
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style scoped></style>