<script setup>
import { VueFinalModal } from 'vue-final-modal'
import modalEdit from './modalEdit.vue';
import { ref, onMounted } from 'vue';
import { useCountryStore } from '@/stores/country'
import { useCompetitorStore } from '@/stores/competitor'
import Swal from 'sweetalert2/dist/sweetalert2';


const competitorStore = useCompetitorStore();
const countryStore = useCountryStore();
onMounted(async () => {
  await competitorStore.getCompetitors();
  await countryStore.getCountries();
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
          'El competidor ha sido eliminado satisfactoriamente.',
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
        <thead class="text-xs border-b text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr class="pl-3">
            <th scope="col" class=" px-6 py-3">Nombre</th>
            <th scope="col" class=" px-4 py-3">Biografía</th>
            <th scope="col" class="">Instagram</th>
            <th scope="col" class=" px-4 py-3">Foto de perfil</th>
            <th scope="col" class=" px-4 py-3">País</th>
            <th scope="col" class=" px-4 py-3">Reto</th>
            <th scope="col" class=" px-4 py-3">Destino</th>
            <th scope="col" class=" px-4 py-3">Fecha de reto</th>
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
                {{ count.country.name }}
              </div>
            </td>
            <td>{{ count.challenge}} km</td>
            <td>{{ count.destination }} </td>
            <td>{{ count.challenge_date }} </td>
            <td class="px-6 py-4">
              <div class="font-medium flex">
                <span class="pr-3">
                  <font-awesome-icon icon="fa-solid fa-eye"
                    class="w-4 h-4  hover:text-black transition duration-150 cursor-pointer" /></span>
                <span class="pr-3">
                  <font-awesome-icon icon="fa-solid fa-pencil"
                    class="w-4 h-4  hover:text-black transition duration-150 cursor-pointer"
                    @click="competitorStore.openModal(count)" /></span>
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

    
  <VueFinalModal
    v-model="competitorStore.showModal"
    class="coupon-modal"
    content-class="coupon-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"  
  >
    <section class="bg-white 0">
      <div class="">
        <h2 class="mb-4 text-2xl font-gerttb text-gray-900">Editar competidor</h2>
        <form @submit.prevent="competitorStore.addCompetitor(competitorStore.formCompetitors)">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="w-full">
              <label class="block mb-1 text-sm font-medium text-gray-900">Nombre del competidor</label>
              <input
                type="text"
                v-model="competitorStore.formCompetitors.name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              />
            </div>
            <div class="w-full">
              <label class="block mb-1 text-sm font-medium text-gray-900">Perfil de instagram</label>
              <div class="flex">
                <span  class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">@</span>
                <input
                  type="text"
                  v-model="competitorStore.formCompetitors.instagram_username"
                  class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                />
              </div>
            </div>
            <div class="w-full">
              <label class="block mb-1 text-sm font-medium">Foto de usuario</label>
              <input
                class="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                id="image"
                type="file"
                @change="handleImageChange"
                accept="image/*"
              />
            </div>
            <div class="w-full flex items-center justify-center">
              <img v-if="selectedImage" :src="selectedImage" alt="" class="prev-img" />
            </div>
            <div>
              <label  class="block mb-1 text-sm font-medium text-gray-900">País</label>
              <select
                v-model="competitorStore.formCompetitors.country_id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option selected="" disabled>Seleciona el país</option>
                <option v-for="country in countryStore.countries" :key="country.id" :value="country.id">
                  {{ country.name }}
                </option>
              </select>
              <div>
                <label for="" class="block mt-4 mb-1 text-sm font-medium text-gray-900">Reto</label>
                <input
                  type="text"
                  v-model="competitorStore.formCompetitors.challenge"
                  class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                />
              </div>
            </div>
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-900">Biografía</label>
              <textarea
                v-model="competitorStore.formCompetitors.instagram_biography"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>
            <div class="w-full flex">
              <div class="w-1/2" style="margin-top:15px; margin-right: 15px;">
                <label for="brand" class="block mb-1 text-sm font-medium text-gray-900">Destino</label
                >
                <input
                  type="text"
                  v-model="competitorStore.formCompetitors.destination"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              <div class="w-1/2" style="margin-left: 15px; margin-top: 15px;">
                <label for="brand" class="block mt-1 mb-1 text-sm font-medium text-gray-900">Fecha de reto</label>
                <input
                  type="text"
                  v-model="competitorStore.formCompetitors.challenge_date"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
              </div>
            </div>
          <div class="flex w-full justify-end items-center mt-8">
            <button type="button"
              @click="competitorStore.close()"
              class="bg-red-600 p-2 rounded-md cursor-pointer text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="bg-green-600 ml-2 p-2 rounded-md text-white cursor-pointer"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </section>
  </VueFinalModal>
  </div>
</template>
<style scoped></style>