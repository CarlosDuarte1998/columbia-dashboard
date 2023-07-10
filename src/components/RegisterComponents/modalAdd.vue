<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { defineProps, defineEmits, ref, onMounted } from 'vue'
import { useCountryStore } from '@/stores/country'
import { useCouponsStore } from '@/stores/coupons'
import { useRegisterStore } from '@/stores/register'
import Swal from 'sweetalert2'

defineProps({

});

const emit = defineEmits(['confirm']);
const countryStore = useCountryStore();
const countries = ref([]);
const couponStore = useCouponsStore();
const coupons = ref([]);

onMounted(async () => {
    await countryStore.getCountries();
    await couponStore.getCoupons();
    countries.value = countryStore.countries;
    coupons.value = couponStore.coupons;
    console.log(JSON.stringify(coupons.value));
});

const name = ref('');
const email = ref('');
const coupon = ref('');
const country = ref('');
const registerStore = useRegisterStore();
const addRegister = async () => {
  try {
    await registerStore.addRegister({
        name: name.value,
        email: email.value,
        discountcode_id: coupon.value,
        country_id: country.value
    });
    emit('confirm');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Registro guardado correctamente',
      showConfirmButton: false,
      timer: 2500
    });
    } catch (error) {
        console.log('Error al agregar el cupón:', error);
    }
};


</script>
<template>
    <VueFinalModal class="coupon-modal" content-class="coupon-modal-content" overlay-transition="vfm-fade"
        content-transition="vfm-fade" :click-to-close="false">
        <section class="bg-white 0">
            <div class="">
                <h2 class="mb-4 text-2xl font-gerttb text-gray-900">Nuevo registro</h2>
                <form @submit.prevent="addRegister">
                    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div class="sm:col-span-2">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Nombre
                            </label>
                            <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " v-model="name">
                        </div>
                        <div class="w-full">
                            <label for="brand" class="block mb-2 text-sm font-medium text-gray-900">Correo</label>
                            <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="email">
                        </div>
                        <div class="w-full">
                            <label for="" class="block mb-2 text-sm font-medium text-gray-900">Código</label>
                            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" v-model="coupon">
                                <option selected="" disabled>Seleciona el código</option>
                                <option v-for="coupon in coupons" :key="coupon.id" :value="coupon.id">{{ coupon.code }}</option>
                            </select>
                        </div>
                        <div class="w-full">
                            <label for="" class="block mb-2 text-sm font-medium text-gray-900">País</label>
                            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" v-model="country">
                                <option selected="" disabled>Seleciona el competidor</option>
                                <option v-for="country in countries" :key="country.id" :value="country.id">{{country.name}}</option>
                            </select>
                        </div>
                        
                    </div>
                    <div class="flex w-full justify-end items-center mt-8">
                        <button @click="emit('confirm')" class="bg-red-600 p-2 rounded-md cursor-pointer text-white">
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
}
</style>