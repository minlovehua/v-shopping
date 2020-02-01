//入口文件

//导入vue  
//(通过npm下载的包在node_modules，import Vue from 'vue' 会自动去node_modules中去找vue这个包)
import Vue from 'vue'   

//1.1导入路由包
//(通过npm下载的包在node_modules，import VueRouter from 'vue-router' 会自动去node_modules中去找vue-router这个包)
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)
//1.3导入自己的 router.js路由模块
import router from './router.js'

//导入App根组件
import app from './App.vue'

//按需导入MInt UI中的组件
import {Header} from 'mint-ui'
Vue.component(Header.name,Header)

//导入MUI的样式
import './lib/mui/css/mui.min.css'

//导入mui的扩展图标样式
import './lib/mui/css/icons-extra.css'

var vm = new Vue({
    el:'#haha',
    render:c=>c(app),
    router //挂载路由对象到VM实例
})


