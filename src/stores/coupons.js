// stores/coupons.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCouponsStore = defineStore('coupons', {
    state: () => ({
        coupons: [],
        token: JSON.parse(localStorage.getItem('token')),
        showModal: false,
        edit: '',
        formCoupon: {
            code: '',
            startFormatted: '',
            endFormatted: '',
            status: ''  
        }
    }),
    actions: {
        async getCoupons() {
            const response = await axios.get('/discount-codes', { headers: { 'Authorization': `Bearer ${this.token}` } });
            this.coupons = response.data.data;

        },
        async addCoupon(data) {
            console.log(data);
            await axios.post('/discount-codes', {
                code: data.code,
                start_date: data.start_date,
                end_date: data.end_date,
                status: data.status,
            }, { headers: { 'Authorization': `Bearer ${this.token}` } })
                .then(response => {
                    this.getCoupons();
                })
                .catch(error => {
                    console.log(error);
                }
            );
        },
        async deleteCoupon(id) {
            await axios.delete('/discount-codes/' + id, { headers: { 'Authorization': `Bearer ${this.token}` } })
                .then(response => {
                    this.getCoupons();
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
        editData(data) {
            let edit = this.coupons.find((el) => el.id == data.id)
            if(edit){
                this.formCoupon.code = edit.code;
                this.formCoupon.start_date = edit.start_date;
                this.formCoupon.end_date = edit.end_date;
                this.formCoupon.status = edit.status;
            }
        },
        openModal(data){
            this.showModal = true;
            this.edit = data;
            this.editData(data);
        },
        closeModal(data){
            this.showModal = false;
        }
    }
})
