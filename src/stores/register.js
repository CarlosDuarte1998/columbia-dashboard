// stores/competitor.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useRegisterStore = defineStore('registers', {
    state: () => ({
        registers: [],
        token: JSON.parse(localStorage.getItem('token')),
        showModal: false,
        formRegister: {
            name: '',
            email: '',
            country_id: '',
        }
    }),
    actions: {
        async getRegister() {
            await axios.get('/registers', {headers: { 'Authorization': `Bearer ${this.token}` }})
            .then(response => {
                this.registers = response.data.data;
            }) .catch(error => {
                console.log(error);
            });
        },
        async addRegister(data) {
            await axios.post('/registers', {
                name: data.name,
                country_id: data.country_id,
                email: data.email,
            }, {headers: { 'Authorization': `Bearer ${this.token}` }})
            .then(response => {
                this.getRegister();
                this.close();
            })
            .catch(error => {
                console.log(error);
            });
        },
    async deleteRegister(data) {
        await axios.delete('/registers/' + data.id, {
          headers: { 'Authorization': `Bearer ${this.token}` },
        }) .then(response => {
          this.getRegister();
        }) .catch(error => {
          console.log(error);
        });
      },
      modal(){
        this.showModal = true;
      },
      close(){
        this.showModal = false;
      }
    }
});