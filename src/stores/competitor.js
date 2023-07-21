// stores/competitor.js
import { defineStore } from 'pinia'
import axios from 'axios'


export const useCompetitorStore = defineStore('competitors', {
  state: () => ({
    competitors: [],
    token: JSON.parse(localStorage.getItem('token')),
    formCompetitors: {
      name: '',
      instagram_username: '',
      instagram_biography: '',
      country_id: '',
      challenge: '',
      image: null,
      destination: '',
      challenge_date: '',
    }
  }),
  actions: {
    async getCompetitors() {
      await axios.get('/competitors', { headers: { 'Authorization': `Bearer ${this.token}` } })
      .then(response => {
        this.competitors = response.data.data;
      }) .catch(err => {
        console.error(err);
      });
    },
    async addCompetitor(data) {
      await axios.post('/competitors/', {
        name: data.name,
        instagram_username: data.instagram_username,
        instagram_biography: data.instagram_biography,
        country_id: data.country_id,
        challenge: data.challenge,
        image: data.image,
        destination: data.destination,
        challenge_date: data.challenge_date,

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
      }) .catch(error => {
        console.log(error);
      });
    }
  },
});

