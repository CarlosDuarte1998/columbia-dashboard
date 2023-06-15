// stores/counter.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCompetitorStore = defineStore('competitor', {
  state: () => ({
    competitor: []
  }),
  actions: {
    async getCompetitor() {
      await axios
        .get('/competitors')
        .then((response) => {
          this.competitor = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async storeCompetitor(){
    },
    async updateCompetitor(){
    },
    async deleteCompetitor(){
    },
  }
})
