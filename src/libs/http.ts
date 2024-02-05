import { Message } from '@arco-design/web-vue'
import axios from 'axios'
import ls from 'localstorage-slim'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 2500,
  headers: {
    'Content-Type': 'application/json',
    'X-App-Name': import.meta.env.VITE_APP_NAME
  }
})

http.interceptors.request.use((config) => {
  const jwt = ls.get('jwt')
  jwt && (config.headers.Authorization = `Bearer ${jwt}`)

  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = ''
    switch (error.response.status) {
      case 401:
        message = 'Unauthorized'
        break
      case 403:
        message = 'Forbidden'
        break
      case 404:
        message = 'Not Found'
        break
      case 500:
        message = 'Internal Server Error'
        break
      default:
        message = error.message
    }

    message && Message.error(message)

    return Promise.reject(error)
  }
)

export default http
