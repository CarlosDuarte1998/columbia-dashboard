// stores/counter.js
import { defineStore } from 'pinia'
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: [],
    formUser: {
      email: '',
      password: '',
    },
    
  }),
  actions: {
    login(data){
      console.log(data);
      axios.post('/auth/login', {email: data.email, password: data.password})
      .then(response => {
        console.log(response);
      })
      
    },
    async getAuth(){
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      this.user = response.data;
    }
  },
})