import axios from 'axios'
import { AxiosInstance } from 'axios'
import { HYRequestInterceptors, HYRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

class HYRequest {
  // 创建axios实例
  instance: AxiosInstance

  // 保存实例中会用到的一些属性
  interceptors?: HYRequestInterceptors

  loading?: LoadingInstance

  showLoading: boolean

  // 实例中的拦截器
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    // 如果并没有穿showLoading 就用？？ 三元运算符简写 默认赋值为 true
    this.showLoading = config.showLoading ?? true

    // 这里是请求拦截器的配置
    // 配置的是 config里面传入的
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    // 这里是返回拦截器
    // 配置也是config里面传入的
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config: any) => {
        // 如果showloading为真 才需要展示这个loading动画
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            fullscreen: true,
            text: '正在请求'
          })
        }
        return config
      },
      (err: any) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res: any) => {
        // 直接可选链 来操作 如果有loading 就移除
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('服务器错误')
        }

        return res.data
      },
      (err: any) => {
        if (err.response.status === 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }
  // request方法的封装
  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个api请求中包含的hook 如何处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 具体返回promise对象
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个api接口的返回拦截处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // 对于具体方法的封装 这里使用了泛型
  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'delete' })
  }
}
export default HYRequest
