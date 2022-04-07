// 对于基础路径以及超时的配置
let BASE_URL = process.env.VUE_APP_BASE_URL

const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = process.env.VUE_APP_BASE_URL
} else if (process.env.NODE_ENV === 'producition') {
  BASE_URL = ''
} else {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  BASE_URL = ''
}

export { BASE_URL, TIME_OUT }
