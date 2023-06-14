import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers.post['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('token'))}`
