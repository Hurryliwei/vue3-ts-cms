import { AxiosRequestConfig, AxiosResponse } from 'axios'

// 定义拦截器的类型 和返回值
export interface HYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (error: any) => any
}

// 定义拦截器的配置
export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T>
  showLoading?: boolean
}
