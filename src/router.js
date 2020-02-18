//导入vue-router
import VueRouter from 'vue-router'

//导入组件
import home from './components/tabbar/HomeContainer.vue'
import member from './components/tabbar/MemberContainer.vue'
import search from './components/tabbar/SearchContainer.vue'
import shopcar from './components/tabbar/ShopcarContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'

//5. 创建路由对象
var router = new VueRouter({
    routes:[  //配置路由规则
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/member',component:member},
        {path:'/shopcar',component:shopcar},
        {path:'/search',component:search},
        {path:'/home/newslist',component:NewsList},
        {path:'/home/newsinfo/:id',component:NewsInfo} //id前面要有冒号:才能匹配到id的值
    ],
    //设置路由高亮显示
    linkActiveClass:'mui-active'  //覆盖默认的路由高亮类(router-link-active)
})

//把路由对象暴露出去
export default router;

