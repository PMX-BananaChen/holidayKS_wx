// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import axios from 'axios';

import router from'./router/index.js'       //---------自定义的路由文件
import Base from './assets/js/baseFun.js'         //---------自定义的公共函数和公共请求方法
import stores from './store/store.js'                //---------自定义的全局变量
import './assets/css/base.css'                    //---------引入的全局公共css
import Vuex from 'vuex';
import  { ConfirmPlugin } from 'vux'
import  { ToastPlugin } from 'vux'

import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css';
Vue.use(YDUI);

Vue.prototype.$axios = axios
//注册全局函数和全局常量
Vue.prototype.baseFun=Base.baseFun;  //-----注册到vue的全局，方便各个组件和页面js调用公共函数
Vue.prototype.baseAjax=Base.baseAjax;//-----将封装的ajax请求函数注册到vue的全局 

Vue.use(VueRouter)
Vue.use(Vuex);

Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
var globalVm=new Vue({
	router,            //-----router文件
    el: '#app',
    store:stores,          //-----全局变量
    template: '<App/>',
    components: { App }
})