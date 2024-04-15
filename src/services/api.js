import axios from 'axios'

const api = axios.create({
  //baseURL: 'https://adote-app.herokuapp.com'
  baseURL: 'http:192.168.1.101:3000'
  //baseURL: 'https://adote-app.onrender.com'
})

export default api
