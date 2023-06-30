// stores/coupons.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCouponsStore = defineStore('coupons', {
    state: () => ({
        coupons: [],
        token: JSON.parse(localStorage.getItem('token')),
    }),
    actions: {
        async getCoupons() {
            const response = await axios.get('/discount-codes', { headers: { 'Authorization': `Bearer ${this.token}` } });
            this.coupons = response.data.data;

        },
        async addCoupon(data) {
            await axios.post('/discount-codes', {
                code: data.code,
                start_date: data.start_date,
                end_date: data.end_date,
                status: data.status,
            }, { headers: { 'Authorization': `Bearer ${this.token}` } })
                .then(response => {
                    this.coupons.push(response.data.data);
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                }
                );
        },
        async deleteCoupon(id) {
            await axios.delete(`/discount-codes/${id}`, { headers: { 'Authorization': `Bearer ${this.token}` } })
                .then(response => {
                    console.log(response);
                    this.coupons = this.coupons.filter(coupon => coupon.id !== id);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        async updateCoupon(data) {
            await axios.put(`/discount-codes/${data.id}`, {
                code: data.code,
                start_date: data.start_date,
                end_date: data.end_date,
                status: data.status,
            }, { headers: { 'Authorization': `Bearer ${this.token}` } })
                .then(response => {
                    this.coupons = this.coupons.map(coupon => {
                        if (coupon.id === data.id) {
                            coupon = response.data.data;
                        }
                        return coupon;
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        },
    }
})
