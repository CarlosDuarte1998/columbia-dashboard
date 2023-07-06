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
        console.log(this.competitors);
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
            this.coupons.push(response.data.data);
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        }
        );
    },
    async updateCompetitor(data) {
      console.log(data);
    },
    async deleteCompetitor(id) {
      try {
        const response = await axios.delete(`/competitors/${id}`, {
          headers: { 'Authorization': `Bearer ${this.token}` },
        });

        this.competitors = this.competitors.filter((competitor) => competitor.id !== id);
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
});

