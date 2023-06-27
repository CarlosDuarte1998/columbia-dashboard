// stores/competitor.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCompetitorStore = defineStore('competitors', {
  state: () => ({
    competitors: [],
    token: JSON.parse(localStorage.getItem('token')),
  }),
  actions: {
    async getCompetitors() {
      const response = await axios.get('/competitors', {headers: { 'Authorization': `Bearer ${this.token}` }});
            this.competitors = response.data.data;
  },
    async storeCompetitor(){
    },
    async updateCompetitor(){
    },
    async deleteCompetitor(){
    }
  }
})
