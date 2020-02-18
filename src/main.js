//入口文件



//导入vue  
//(通过npm下载的包在node_modules，import Vue from 'vue' 会自动去node_modules中去找vue这个包)
import Vue from 'vue'


//导入App根组件
import app from './App.vue'


//1.1导入路由包
//(通过npm下载的包在node_modules，import VueRouter from 'vue-router' 会自动去node_modules中去找vue-router这个包)
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)
//1.3导入自己的 router.js路由模块
import router from './router.js'


//按需导入MInt UI中的组件
import {Header,Swipe, SwipeItem,Button} from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);


//导入MUI的样式
import './lib/mui/css/mui.min.css'


//导入mui的扩展图标样式
import './lib/mui/css/icons-extra.css'

//2.1导入 vue-resource 
import VueResource from 'vue-resource'
//2.2安装 vue-resource
Vue.use(VueResource)

//全局配置 请求的根路径。 老师的http://vue.studyit.io 用不了了，用我自己找的
Vue.http.options.root = 'http://www.liulongbin.top:3005'

//全局配置 post时表单数据格式组织形式
Vue.http.options.emulateJSON=true;


//导入时间插件
import moment from 'moment' //它会自己到node_modules文件中找到刚刚cnpm install 好的 moment
//定义全局过滤器
Vue.filter('dateFormat',function(dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
    //用现成的 Nodejs 里面的 moment
    return moment(dataStr).format(pattern);
})


var vm = new Vue({
    el:'#haha',
    render:c=>c(app),
    router //挂载路由对象到VM实例
})


