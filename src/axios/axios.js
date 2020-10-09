import axios from 'axios'
import Vue from 'vue'
import { Loading } from 'element-ui';
axios.defaults.withCredentials = true; 
export default function ajax (url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    const header = { contentType: 'application/json;charset=UTF-8' }
    if (type === 'GET' || type === 'get') {
      promise = axios.get(url, {
        params: data
      }, header)
    } else {
      promise = axios.post(url, data, header)
    }
    let loadingInstance = Loading.service({ fullscreen: true });
    promise.then(response => {
      const data = response.data
      resolve(data)
      loadingInstance.close();
    })
      .catch(err => {
        loadingInstance.close();
        if (err.response.data && err.response.data.message) {
          Vue.prototype.$message.error(err.response.data.message)
        } else {
          Vue.prototype.$message.error('网络出错了！')
        }
        reject(err)
      })
  })
}