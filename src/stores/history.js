// stores/competitor.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useHistoriesStore = defineStore('histories', {
    state: () => ({
        histories: [],
        token: JSON.parse(localStorage.getItem('token')),
    }),
    actions: {
        async getHistories() {
            const response = await axios.get('/history', {headers: { 'Authorization': `Bearer ${this.token}` }});
            this.histories = response.data.data;
        }
    }
});
