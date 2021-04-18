import axios from 'axios'

export default axios.create({
  baseURL: 'https://videogame-quizzz-default-rtdb.firebaseio.com/'
})
