<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { defineProps, defineEmits } from 'vue'




defineProps({
  
});

// eslint-disable-next-line
const emit = defineEmits(['confirm']);
</script>
<template>
    <VueFinalModal class="coupon-modal" content-class="coupon-modal-content" overlay-transition="vfm-fade"
        content-transition="vfm-fade" :click-to-close="true">
        <section class="bg-white 0">
            <div class="">
                <h2 class="mb-4 text-2xl font-gerttb text-gray-900">Editar cupon</h2>
                <form action="#">
                    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div class="sm:col-span-2">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Código del cupón
                            </label>
                            <input type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="BETHEGOAT2023" required="" />
                        </div>
                        <div class="w-full">
                            <label for="brand" class="block mb-2 text-sm font-medium text-gray-900">Fecha de inicio</label>
                            <div class="relative max-w-sm">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <input datepicker datepicker-format="mm/dd/yyyy" type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Select date">
                            </div>
                        </div>
                        <div class="w-full">
                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900">Fecha de fin</label>
                            <input type="number" name="price" id="price"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="$2999" required="" />
                        </div>
                        <div>
                            <label for="category" class="block mb-2 text-sm font-medium text-gray-900">Pais</label>
                            <select id="category"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                <option selected="" disabled>Seleciona el país</option>
                                <option value="TV">El Salvador</option>
                                <option value="PC">Guatemala</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex w-full justify-end items-center mt-8">
                        <span @click="emit('confirm')" class="bg-red-600 p-2 rounded-md cursor-pointer text-white">
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
