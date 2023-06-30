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
            const response = await axios.get('/registers', {headers: { 'Authorization': `Bearer ${this.token}` }});
            this.registers = response.data.data;
        },
        async addRegister(data) {
            try {
                const response = await axios.post('/registers', {
                    dicountcode_id: data.dicountcode_id,
                    name: data.name,
                    country_id: data.country_id,
                    email: data.email,
                });
                
                this.registers.push(response.data.data);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        },
    }
});