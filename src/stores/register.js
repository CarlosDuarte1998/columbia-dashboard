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
        }
    }
});