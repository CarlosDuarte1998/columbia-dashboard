// stores/country.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useCountryStore = defineStore('country', {
    state: () => ({ 
        countries: [],
        token: JSON.parse(localStorage.getItem('token')),
    }),
    actions: {
        async getCountries() {
            const response = await axios.get('/countries', {headers: { 'Authorization': `Bearer ${this.token}` }});
            this.countries = response.data.data;
        },
        
    }
})
