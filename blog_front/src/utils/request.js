import axios from "axios";
import context from '@/main'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 30000
});

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error);
    Promise.reject(error)
  }
);


service.interceptors.response.use(
  response => {
    let res = response.data;
    if(res.code == 0 ) {
      return response;
    } else {
      context.$bvToast.toast(res.msg, {
        title: '错误提示',
        autoHideDelay: 2000,
        appendToast: true,
        variant: 'danger'
      });
      return Promise.reject(response)
    }
  },
  error => {
    console.log('err >> ' + error);
    context.$bvToast.toast('网络连接出错', {
      title: '错误提示',
      autoHideDelay: 2000,
      appendToast: true,
      variant: 'danger'
    });
    return Promise.reject(error);
  }
);

export default service
