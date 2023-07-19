// stores/competitor.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useHistoriesStore = defineStore('histories', {
    state: () => ({
        hist: [],
        token: JSON.parse(localStorage.getItem('token')),
    }),
    actions: {
        async getHistories() {
            const response = await axios.get('/history', {headers: { 'Authorization': `Bearer ${this.token}` }});
            this.hist = response.data.data;
            console.log(this.hist);
        },
        async addHistory(data) {
            await axios.post('/history', {
                competitor_id: data.competitor_id,
                time: data.time,
                distance: data.distance,
            }, { headers: { 'Authorization': `Bearer ${this.token}` } })
                .then(response => {
                    this.histories = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                }
            );
        },
        async deleteHistory(id) {
            await axios.delete(`/history/${id}`, { headers: { 'Authorization': `Bearer ${this.token}` } })
                .then(response => {
                    this.histories = this.histories.filter(history => history.id !== id);
                })
                .catch(error => {
                    console.log(error);
                }
                );
        },
        async updateHistory(data) {
            await axios.put(`/history/${data.id}`, {
                competitor_id: data.competitor_id,
                time: data.time,
                distance: data.distance,
            }, { headers: { 'Authorization': `Bearer ${this.token}` } })
                .then(response => {
                    this.histories = this.histories.map(history => {
                        if (history.id === data.id) {
                            history = response.data.data;
                        }
                        return history;
                    });
                })
                .catch(error => {
                    console.log(error);
                }
            );
        },
    }
});
