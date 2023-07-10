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
      await axios.get('/competitors', { headers: { 'Authorization': `Bearer ${this.token}` } })
      .then(response => {
        this.competitors = response.data.data;
      })
    },
    async addCompetitor(data) {
      console.log(data);
      await axios.post('/competitors/', {
        name: data.name,
        instagram_username: data.instagram_username,
        instagram_biography: data.instagram_biography,
        country_id: data.country_id,
        image: data.image,
        challenge: data.challenge

    }, { headers: { 'Authorization': `Bearer ${this.token}` } })
        .then(response => {
            this.coupons = response.data.data;
        })
        .catch(error => {
            console.log(error);
        }
        );
    },
    async deleteCompetitor(data) {
      await axios.delete('/competitors/' + data.id, {
        headers: { 'Authorization': `Bearer ${this.token}` },
      }) .then(response => {
        this.getCompetitors();
        console.log(response.data.data);
      }) .catch(error => {
        console.log(error);
      });
    }
  },
});

