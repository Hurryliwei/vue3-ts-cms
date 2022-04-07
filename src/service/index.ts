// service的出口
import HYRequest from './request/index'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/util/cache'
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch(error: any): any {
      return error
    }
  }
})

export default hyRequest
