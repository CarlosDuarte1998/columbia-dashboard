<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { defineProps, defineEmits, ref, onMounted } from 'vue'
import { useCountryStore } from '@/stores/country'
import { useCouponsStore } from '@/stores/coupons'


defineProps({
    title: String,
});
const emit = defineEmits(['confirm']);
const dateRange = ref({ start: new Date(), end: new Date() });
const storeCoupons = useCouponsStore();
const handleDate = (modelData, property) => {
    const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    dateRange.value[property] = modelData;
    console.log(dateRange.value[property].toLocaleDateString('es-ES', options));
};

const countryStore = useCountryStore();
onMounted(async () => {
    await countryStore.getCountries();
    
});



</script>
<template>
    <VueFinalModal class="coupon-modal" content-class="coupon-modal-content" overlay-transition="vfm-fade"
        content-transition="vfm-fade" :click-to-close="false">
        <section class="bg-white 0">
            <div class="">
                <h2 class="mb-4 text-2xl font-gerttb text-gray-900">Editar cupón</h2>
                <form action="#">
                    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div class="sm:col-span-2">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Código del cupón
                            </label>
                            <input type="text" v-model="storeCoupons.formCoupon.code"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        </div>
                        <div class="w-full">
                            <label for="brand" class="block mb-2 text-sm font-medium text-gray-900">Fecha de inicio</label>
                            <VueDatePicker :teleport="true" teleport-center :model-value="dateRange.start"
                                time-picker-inline :is-24="false"
                                @update:model-value="modelData => handleDate(modelData, 'start')" />
                        </div>
                        <div class="w-full">
                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900">Fecha de fin</label>
                            <VueDatePicker :teleport="true" teleport-center :model-value="dateRange.end" time-picker-inline
                                :is-24="false" @update:model-value="modelData => handleDate(modelData, 'end')" />
                        </div>
                        <!--<div>
                            <label for="country" class="block mb-2 text-sm font-medium text-gray-900">Pais</label>
                            <select v-model="storeCoupons.formCoupon.status"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                <option selected="" disabled>Seleciona el país</option>
                                <option v-for="country in countryStore.countries" :key="country.id">{{ country.name }}</option>
                            </select>
                        </div>-->
                        <div>
                            <label for="status" class="block mb-2 text-sm font-medium text-gray-900">Estado</label>
                            <select id="status"
                                class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5">
                                <option selected disabled class="text-black">Seleciona el estado</option>
                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>
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
}
</style>
