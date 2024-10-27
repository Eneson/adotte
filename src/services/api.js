import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.3.7:3000',
  //baseURL: 'https://adote-app.herokuapp.com',
  timeout: 30000,
})

export default api