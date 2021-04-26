import ApolloClient from 'apollo-boost';
import axios ,{ AxiosInstance} from 'axios'


export const gqlClient = new ApolloClient<unknown>({
  uri: 'http://localhost:3000/graphql'
});

const service: AxiosInstance = axios.create({
  baseURL:'/',
  timeout: 120000, // 请求超时时间
  // headers: { 'X-Custom-Header': 'XMLHttpRequest' }
  // ajax请求标识
  // withCredentials: process.env.VUE_APP_BASEPATH !== '/'
})

// request拦截器定义
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const code = response.data.code
    if (code < 200 || code > 300) {
      return Promise.reject(response)
    } else {
      return response.data.data
    }
  },
  error => {
    let code = 0
    try {
      code = error.response.status
    } catch (e) {
      // if (error.toString().indexOf('Error: timeout') !== -1) {
      //   // Mes.error('网络请求超时')
      // } else if (error.toString().indexOf('Error: Network Error') !== -1) {
      //   Mes.error(`errcode:500 网络请求错误`)
      // } else {
      //   Mes.error(`errcode:500 网络请求错误`)
      // }
      return Promise.reject(error)
    }
    // switch (code) {
    //   case 400:
    //     Mes.error(`errcode:${code} 请求参数异常`)
    //     break
    //   case 500:
    //     Mes.error(`errcode:${code} 网络服务器错误`)
    //     break
    //   default:
    //     Mes.error(`errcode:${code} 请求异常`)
    //     break
    // }
    // if (code === 403) {
    //   window.location = '#/401'
    // }
    return Promise.reject(error)
  }
)
export default service
