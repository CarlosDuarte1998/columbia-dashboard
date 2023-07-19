<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { defineProps, defineEmits, ref, onMounted } from 'vue'
import { useCountryStore } from '@/stores/country'
import { useCompetitorStore } from '@/stores/competitor'
import Swal from 'sweetalert2/dist/sweetalert2'

defineProps({})
const emit = defineEmits(['confirm'])
let image = null

const countryStore = useCountryStore()
const competitorStore = useCompetitorStore()
onMounted(async () => {
  await countryStore.getCountries();
})


const selectedImage = ref('./src/assets/img/perfile.png')
const handleImageChange = (event) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  image = event.target.files[0]
  reader.onload = () => {
    selectedImage.value = reader.result
  }
  if (file) {
    reader.readAsDataURL(file)
  } else {
    selectedImage.value = './src/assets/img/perfile.png'
  }
}


</script>
<template>
  <VueFinalModal
    class="coupon-modal"
    content-class="coupon-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
    :click-to-close="false"
  >
    <section class="bg-white 0">
      <div class="">
        <h2 class="mb-4 text-2xl font-gerttb text-gray-900">Añadir nuevo competidor</h2>
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
                required
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
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
                v-model="competitorStore.formCompetitors.country_id"
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
                required
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
            <button
              @click="emit('confirm')"
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

.coupon-modal-content > * + * {
  margin: 0.5rem 0;
}

.coupon-modal-content h1 {
  font-size: 1.375rem;
}

.dark .coupon-modal-content {
  background: #000;
}

.prev-img {
  width: auto;
  height: 100px;
}
</style>
