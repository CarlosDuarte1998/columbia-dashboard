import { defineStore } from 'pinia'
import axios from 'axios'

export const useCouponsStore = defineStore('coupons', {
    state: () => ({
        cupon: [],
        token: '',
    }),
    actions: {

    }
})
