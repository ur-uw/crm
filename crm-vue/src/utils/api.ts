import axios from 'axios'
import router from '@/router/index'

const baseURL = 'http://127.0.0.1:8000'

const api = axios.create({
  baseURL: baseURL
})
api.defaults.headers.common['Accept'] = 'application/json'
api.defaults.headers.common['Content-Type'] = 'application/json'

api.interceptors.response.use(undefined, (error) => {
  let route = { name: 'error', path: 'error' }
  switch (error.response.status) {
    case 401:
      route = { name: 'login', path: '/login' }
      break
    case 404:
      route = {
        name: 'not-found.show',
        path: '/:pathMatch(.*)*'
      }
      break
  }
  // TODO: make sure that url stay the same when it redirects to NotFound page
  router.push(route)
  return Promise.reject(error)
})
export default api
