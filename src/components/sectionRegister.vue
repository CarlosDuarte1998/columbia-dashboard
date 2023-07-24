<script setup>
import dataTable from './RegisterComponents/dataTable.vue';
import { defineProps, defineEmits, ref, onMounted } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import modalAdd from './RegisterComponents/modalAdd.vue';
import { useRegisterStore } from '@/stores/register'
import { useCountryStore } from '@/stores/country'
import { useCouponsStore } from '@/stores/coupons'

const countryStore = useCountryStore();
const couponStore = useCouponsStore();
const registerStore = useRegisterStore();
onMounted(async () => {
    await countryStore.getCountries();
    await couponStore.getCoupons();
});

</script>
<template>
    <div class="mt-8 p-4" style="width:80%; float:right;">
      <h1 class="font-bold text-2xl mt-8">Registros</h1>
      <div class="flex w-full justify-end">
        <button @click="registerStore.modal()" class="border mt-1 mr-4 border-black p-2 cursor-pointer butt">
          <font-awesome-icon icon="fa-solid fa-plus" /> Nuevo registro
        </button>
      </div>
      <dataTable />

      
    <VueFinalModal 
      v-model="registerStore.showModal"
      class="coupon-modal"
      content-class="coupon-modal-content"
      overlay-transition="vfm-fade"
      content-transition="vfm-fade">
        <section class="bg-white 0">
            <div class="">
                <h2 class="mb-4 text-2xl font-gerttb text-gray-900">Nuevo registro</h2>
                <form @submit.prevent="registerStore.addRegister(registerStore.formRegister)">
                    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div class="sm:col-span-2">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
                            <input v-model="registerStore.formRegister.name" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ">
                        </div>
                        <div class="w-full">
                            <label for="brand" class="block mb-2 text-sm font-medium text-gray-900">Correo</label>
                            <input v-model="registerStore.formRegister.email" type="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        </div>
                        <div class="w-full">
                            <label class="block mb-2 text-sm font-medium text-gray-900">Código</label>
                            <span v-for="coupon in couponStore.coupons" :key="coupon.id" :value="coupon.id">
                                <input :value="coupon.code" type="text" disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            </span>
                            <!--<select v-model="registerStore.formRegister.discountcode_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                <option selected="" disabled>Seleciona el código</option>
                                <option v-for="coupon in couponStore.coupons" :key="coupon.id" :value="coupon.id">{{ coupon.code }}</option>
                            </select>-->
                        </div>
                        <div class="w-full">
                            <label class="block mb-2 text-sm font-medium text-gray-900">País</label>
                            <select v-model="registerStore.formRegister.country_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                <option selected="" disabled>Seleciona el competidor</option>
                                <option v-for="country in countryStore.countries" :key="country.id" :value="country.id">{{country.name}}</option>
                            </select>
                        </div>
                    </div><br>    
                    <p>*Recuerda que se enviará el código de descuento al correo electrónico ingresado en este formulario</p>
                    <div class="flex w-full justify-end items-center mt-8">
                        <button type="button" @click="registerStore.close" class="bg-red-600 p-2 rounded-md cursor-pointer text-white">
                            Cancelar
                        </button>
                        <button class="bg-green-600 ml-2 p-2 rounded-md text-white cursor-pointer">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </VueFinalModal>
    </div>

    
</template>
<style>
  .butt:hover{
    background: #000000;
    color: white;
    transition: all 0.5s;
  }
</style>