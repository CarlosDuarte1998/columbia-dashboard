// stores/competitor.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useRegisterStore = defineStore('registers', {
    state: () => ({
        registers: [],
        token: JSON.parse(localStorage.getItem('token')),
    }),
    actions: {
        async getRegister() {
            await axios.get('/registers', {headers: { 'Authorization': `Bearer ${this.token}` }})
            .then(response => {
                this.registers = response.data.data;
            }) .catch(error => {
                console.log(error);
            });
        },
        async addRegister(data) {
            await axios.post('/registers', {
                discountcode_id: data.discountcode_id,
                name: data.name,
                country_id: data.country_id,
                email: data.email,
            }, {headers: { 'Authorization': `Bearer ${this.token}` }})
            .then(response => {
                this.getRegister();
            })
            .catch(error => {
                console.log(error);
            });
        },
    async deleteRegister(data) {
        await axios.delete('/registers/' + data.id, {
          headers: { 'Authorization': `Bearer ${this.token}` },
        }) .then(response => {
          this.getRegister();
          console.log(response.data.data);
        }) .catch(error => {
          console.log(error);
        });
      }
    }
});