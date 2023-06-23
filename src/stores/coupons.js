import { defineStore } from 'pinia'
import axios from 'axios'

export const useCouponsStore = defineStore('coupons', {
    state: () => ({
        coupons: [],
        token: JSON.parse(localStorage.getItem('token')),
    }),
    actions: {
        async getCoupons() {
            const response = await axios.get('/discount-codes', {headers: { 'Authorization': `Bearer ${this.token}` }});
            this.coupons = response.data.data;

        },
    }
})
