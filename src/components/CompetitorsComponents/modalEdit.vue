<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { defineProps, defineEmits } from 'vue'

defineProps({

});

const emit = defineEmits(['confirm']);
</script>
<template>
  <VueFinalModal class="coupon-modal" content-class="coupon-modal-content" overlay-transition="vfm-fade"
    content-transition="vfm-fade" :click-to-close="true">
    <section class="bg-white 0">
      <div class="">
        <h2 class="mb-4 text-2xl font-gerttb text-gray-900">Editar datos</h2>
        <form action="#">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="w-full">
              <label for="brand" class="block mb-2 text-sm font-medium text-gray-900">Nombre del competidor</label>
              <input type="text" name="name" id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Nombre Apellido" required="" />
            </div>
            <div class="w-full">
              <label for="price" class="block mb-2 text-sm font-medium text-gray-900">Perfil de instagram</label>

              <div class="flex">
                <span
                  class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                  @
                </span>
                <input type="text" id="website-admin"
                  class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                  placeholder="usuarioinstagram">
              </div>

            </div>
            <div class="w-full">
              <label for="brand" class="block mb-2 text-sm font-medium ">Foto de usuario</label>
              <input class="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 " id="file_input" type="file">
            </div>
            <div class="w-full">
              <img src="" alt="">
            </div>
            <div>
              <label for="category" class="block mb-2 text-sm font-medium text-gray-900">Pais</label>
              <select id="country"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                <option selected="" disabled>Seleciona el país</option>
                <option value="TV">El Salvador</option>
                <option value="PC">Guatemala</option>
              </select>
            </div>
            <div>

              <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Biografía</label>
              <textarea id="message" rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Escribe su biografía "></textarea>

            </div>
          </div>
          <div class="flex w-full justify-end items-center mt-8">
            <button @click="emit('confirm')" class="bg-red-600 p-2 rounded-md cursor-pointer text-white">
              Cancelar
            </button>
            <button type="submit" class="bg-green-600 ml-2 p-2 rounded-md text-white cursor-pointer">
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
}</style>
