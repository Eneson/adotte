import axios from 'axios'

const api = axios.create({
  //baseURL: 'https://adote-app.herokuapp.com'
  baseURL: 'http://192.168.3.7:3000'
})

export default api