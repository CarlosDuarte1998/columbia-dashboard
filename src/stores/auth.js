// stores/counter.js
import { defineStore } from 'pinia'
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: [],
    token: '',
    user_data: ''
  }),
    actions: {
      async login(data){
        await axios.post('/auth/login', {email: data.email, password: data.password})
        .then(response => {
          this.user_data = response.data.user,
          this.token = response.data.token;
          localStorage.setItem('token', JSON.stringify(this.token));
          localStorage.setItem('user', JSON.stringify(this.user_data));
          this.router.push('/competitor');
        })
        .catch(err => {
          console.log(err);
        })
      },
      async authUser(){
        await axios.post('/user-data', {headers: { 'Authorization': `Bearer ${this.token}` }})
        .then(response => {
          this.user_data = response.data.data;
        })
        .error(err => {
          console.log(err);
        });
    },
  }
})