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
      await axios.post('/competitors/', {
        name: data.name,
        instagram_username: data.instagram_username,
        instagram_biography: data.instagram_biography,
        country_id: data.country_id,
        image: data.image,

    }, { headers: { 'Authorization': `Bearer ${this.token}` } })
        .then(response => {
            this.coupons = response.data.data;
        })
        .catch(error => {
            console.log(error);
        }
        );
    },
    async updateCompetitor(data) {},
    async deleteCompetitor(id) {
      try {
        const response = await axios.delete(`/competitors/${id}`, {
          headers: { 'Authorization': `Bearer ${this.token}` },
        });
        this.competitors = this.competitors.filter((competitor) => competitor.id !== id);
      } catch (error) {
        console.log(error);
      }
    },
  },
});

