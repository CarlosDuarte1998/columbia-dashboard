// stores/competitor.js
import { defineStore } from 'pinia'
import axios from 'axios'


export const useCompetitorStore = defineStore('competitors', {
  state: () => ({
    competitors: [],
    token: JSON.parse(localStorage.getItem('token')),
    showModal: false,
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
    },
    editData(data) {
        let edit = this.competitors.find((el) => el.id == data.id)
        if(edit){
            this.formCompetitors.name = edit.name;
            this.formCompetitors.instagram_username = edit.instagram_username;
            this.formCompetitors.instagram_biography = edit.instagram_biography;
            this.formCompetitors.country_id = edit.country.id;
            this.formCompetitors.challenge = edit.challenge;
            this.formCompetitors.image = edit.image;
            this.formCompetitors.destination = edit.destination;
            this.formCompetitors.challenge_date = edit.challenge_date;
        }
    },
    openModal(data){
      this.showModal = true;
      this.editData(data);
    },
    close(){
      this.showModal = false;
    }
  },
});

