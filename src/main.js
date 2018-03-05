import Vue from 'vue'
import vueRouter from 'vue-router'
import store from './store'

import App from './App'
import Index from './components/Index.vue'
// import Indexfanpai from './components/Indexfanpai.vue'

Vue.use(vueRouter);








/**
 * 定义路由
 * */
const routes = [
  {path: '/', component: Index},//首页
  // {path: '/test', component: Indexfanpai},//Testu 上线前删掉 图片翻转测试
]

/**
 * 创建router实例
 * */
const router = new vueRouter({
  routes
})

/**
 * 创建和挂载根实例
 * */
const app = new Vue({
  template: '<App/>',
  components: { App },
  router,
  store
}).$mount('#app')