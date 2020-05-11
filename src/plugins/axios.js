
import qs from 'qs'
// import Vue from 'vue';
import axios from "axios";
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
let ConfigUrl;
if (process.env.NODE_ENV == 'development') {
  ConfigUrl = "http://60.208.23.51:7181/xdl-core";
} else if (process.env.NODE_ENV == 'production') {
  ConfigUrl = "http://124.128.225.19:9091";
  // ConfigUrl = "http://172.31.2.99:8070/xdl-core/";
}
let config = {
  baseURL: ConfigUrl,
  timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    // if(store.state.adimateFlag){3
    //   store.commit('setloadingFlag',false)
    // }
    config.headers['token'] = localStorage.sc_ssoToken
    // if (config.method == 'post') {
    //   config.data = {
    //     ...config.data,
    //     token: commonVue.sc_ssoToken
    //   }
    // } else {
    //   config.params.token = commonVue.sc_ssoToken;
    // }
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    console.log(config)
    return config;
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    console.log(response.data.code)
    if (response.data.code == 0 || response.data.code == '202') {
      return response;
    } else {
      // if (commonVue.isMobile()) {
      //   store.commit('commonStore/setloadingFlag', false)
      // } else {
      //   ELEMENT.Message({
      //     showClose: true,
      //     message: (response.data.msg == null || response.data.msg == "" || response.data.msg == undefined) ? "接口响应出错！" : response.data.msg,
      //     type: "error"
      //   });
      // }

    }
  },
  function (error) {
    // if (commonVue.isMobile()) {
    //   // mui.toast("获取数据失败")
    // } else {
    // }
    return Promise.reject(error);
  }
);


export default _axios;
