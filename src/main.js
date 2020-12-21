import Vue from "vue";
import App from "./App.vue";
import util from "./components/common/util.js";
import router from "./router";
import store from "./store";
import "./components/common/_iconfont/iconfont.js";
import "./components/common/_iconfont/iconfont.css";
import echarts from "echarts";
import { auth_token, auth_token_info } from "./api/beans/auth";
import Mint from "mint-ui";
import "mint-ui/lib/style.css";
Vue.use(Mint);
// filter production infos
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.prototype.$util = util;
Vue.prototype.$ajax = $.ajax;
Vue.prototype.$window = window;
Vue.prototype.$imgIndex = "0217"; //  图片下标
Vue.prototype.$date = function(){
  const time = new Date();
  return time.getDate()-1;
}; 
//路由跳转
Vue.prototype.$goRoute = function (index) {
  this.$router.push({ name: index, params: { Jump: false } });
};

/**
 * 生产环境入口页面:9003上跳转内部页面:5001带token
 * 若有token获取token存放并重定向
 */
const tokenCatch = () => {
  const { access_token } = Vue.prototype.$util.fetchQuerys();
  if (access_token) {
    localStorage.setItem("access_token", access_token);
    // Vue.prototype.$util.setStorage("access_token", access_token);
    window.location.href = "./index.html";
  }
};
tokenCatch();
/**
 * 本地调试、对外环境不需要手动登录
 * dev      admin
 * outside  游客
 */
const app = async fn => {
  if (!sessionStorage.getItem("shallRefresh")) {
    sessionStorage.setItem("shallRefresh", true);
    location.reload();
  }
  await auth_token("kcadmin");
  fn && fn();
};
app(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
});
