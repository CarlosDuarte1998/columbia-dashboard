// stores/counter.js
import { defineStore } from 'pinia'
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: []
  }),
  actions: {
    async getAuth(){
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      this.user = response.data;
    }
  },
})