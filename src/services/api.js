import axios from 'axios'
//baseURL: 'http://192.168.3.7:3000',
//baseURL: 'https://adote-app.herokuapp.com',

const api = axios.create({
  baseURL: 'http://192.168.3.7:3000',
  timeout: 30000,
})

export default api