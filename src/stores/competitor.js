// stores/counter.js
import { defineStore } from 'pinia'
import axios from 'axios';

export const useCompetitorStore = defineStore('competitor', {
  state: () => ({
    competitor: []
  }),
  actions: {
    async getCompetitor(){
        await axios.get('/competitors')
        .then((response) => {
            console.log(response);
            this.competitor = response.data.data;
            console.log(this.competitor);
        })
        .catch((error) => {
            console.log(error);
        });
    }
  },
})