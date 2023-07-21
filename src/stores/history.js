// stores/competitor.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useHistoriesStore = defineStore('histories', {
    state: () => ({
        hist: [],
        token: JSON.parse(localStorage.getItem('token')),
        modalEdit: false,
        edit: '',
        formHistory: {
            competitor_id: '',
            distance: '',
            time: '',
        }
    }),
    actions: {
        async getHistories() {
            await axios.get('/history', {headers: { 'Authorization': `Bearer ${this.token}` }})
            .then(response => {
                this.hist = response.data.data;
            }) .catch(err => { console.log(err); });
        },
        async addHistory(data) {
            await axios.post('/history', {
                competitor_id: data.competitor_id,
                time: data.time,
                distance: data.distance,
            }, { headers: { 'Authorization': `Bearer ${this.token}` } })
                .then(response => {
                    this.hist = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                }
            );
        },
        async deleteHistory(id) {
            await axios.delete(`/history/${id}`, { headers: { 'Authorization': `Bearer ${this.token}` } })
                .then(response => {
                    this.hist = this.hist.filter(history => history.id !== id);
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
        editData(data) {
            let edit = this.hist.find((el) => el.id == data.id)
            if(edit){
                this.formHistory.code = edit.competitor_id;
                this.formHistory.start_date = edit.distance;
                this.formHistory.end_date = edit.time;
            }
        },
        openModal(data){
            this.modalEdit = true;
            this.edit = data;
            this.editData(data);
        },
    }
});
