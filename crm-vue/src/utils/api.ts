import axios from 'axios'
import router from '@/router/index'

const baseURL = 'http://localhost:8000'

const api = axios.create({
  baseURL: baseURL
})
api.defaults.headers.common['Accept'] = 'application/json'
api.defaults.headers.common['Content-Type'] = 'application/json'
api.interceptors.response.use(undefined, (error) => {
  let route = { name: 'error.show' }
  switch (error.response.status) {
    case 401:
      route = { name: 'login' }
      break
    case 419:
      route = { name: 'login' }
      break
    // TODO: make sure that url stay the same when it redirects to NotFound page
    case 404:
      route = {
        name: 'not-found.show'
      }
      break
    case 422:
      return Promise.reject(error)
  }
  router.push(route)
  return Promise.reject(error)
})
export default api
