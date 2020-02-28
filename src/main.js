//入口文件

//导入vue  
//(通过npm下载的包在node_modules，import Vue from 'vue' 会自动去node_modules中去找vue这个包)
import Vue from 'vue'

//注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//每次进入网站，肯定会调用main.js，在刚调用的时候，先从本地存储中把购物车的数据拿出来，放到store中。
var car = JSON.parse(localStorage.getItem('car')||'[]')
var store = new Vuex.Store({
    state:{                 //获取state中数据的方式 this.$store.state.xxx
        //car:[],           //购物者中商品的数据用一个数组存储。在car数组里存储商品对象。
        car:car             //商品对象：{id:商品id,count:购买数量,price:商品单价,selected:是否选中进行结算}
    },
    mutations:{                                              //在mutations中操作state中的数据  
        addToCar(state,goodsinfo){                           //点击“加入购物车”，把商品信息保存到store中的car数组里                  
            var flag = false                                 //假设在购物车中没有找到该商品 flag=false
            state.car.some(item=>{                           //如果购物车中已经存在此商品，则直接更新数量。
                if(item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count)
                    flag = true                              //找到了该商品 flag=true
                    return true                              //终止后续的some循环
                }
            })
            if(!flag){                                       //即 flag === false ，在car数组中没有找到该商品,
                state.car.push(goodsinfo)                    //则将商品push到car数组中
            }
            //当更新了car之后，把car数组存储到本地的localStorage中。
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsInfo(state,goodsinfo){  //这里goodsinfo是调用者传递过来的参数 {id,count}
            //修改购物车中商品的数量值
            state.car.some(item=>{ 
                //因为点击numbox的加减修改一个商品的数量时，这个numbox的文本框一旦改变，就会执行此方法，
                //所以，此刻只涉及到一件商品的修改，所以只需要找到这个商品就可以终止循环了，所以用some不用forEach。
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            //当更新了car之后，把car数组存储到本地的localStorage中。
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        removeFromCar(state,id){ //跟据id，从store中的购物车中删除对应的商品
            state.car.some((item,i)=>{
                if(item.id == id){
                    state.car.splice(i,1); //从下标为i开始删，删除1个
                    return true //终止循环
                }
            })
            //当更新了car之后，把car数组存储到本地的localStorage中。
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info){ //将选中状态同步到store中。info是调用者传递过来的数据 {id,selected} 。
            state.car.some(item=>{
                if(item.id == info.id){
                    item.selected = info.selected;
                }
            })
            //当更新了car之后，把car数组存储到本地的localStorage中。
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{      //获取getters提供的数据的方式 this.$store.getters.xxx
        /* 
        sumCount:function(state){
            var sum = 0;
            state.car.forEach(item=>{
                sum += parseInt(item.count)
            })
            return sum;
        }*/

        getAllCount(state){ //计算购物车中所有物品的数量总和
            var c = 0;
            state.car.forEach(item=>{
                c += item.count
            })
            return c
        },
        getGoodsCount(state){ //把当前循环到的商品的id作为对象的属性名，count作为对象的属性值
            var o = {}
            state.car.forEach(item=>{
                o[item.id]=item.count;
            })
            return o
        },
        getGoodsSelected(state){ //把当前循环到的商品的id作为对象的属性名，选中状态selected作为对象的属性值
            var o = {}
            state.car.forEach(item=>{
                o[item.id]=item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state){ //计算购物车里勾选的总数量和总价格
            var o = {
                count:0, //勾选的数量
                amount:0 //勾选的总价
            }
            state.car.forEach(item=>{
                if(item.selected){ //只计算被选中的商品  item.selected == true时 
                    o.count += item.count;
                    o.amount += item.price*item.count;
                }
            })
            return o
        }
        
        // getAllId(state){ //遍历store中car数组的每一项，并将id用逗号隔开拼接在一起
        //     var id = '';
        //     state.car.forEach(item=>{
        //         id += item.id
        //         id += ',';
        //     })
        //     id = id.substring(0,id.length-1); //substring() 截取字符串
        //     return id
        // }
    }
})



//导入App根组件
import app from './App.vue'


//1.1导入路由包
//(通过npm下载的包在node_modules，import VueRouter from 'vue-router' 会自动去node_modules中去找vue-router这个包)
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)
//1.3导入自己的 router.js路由模块
import router from './router.js'


//按需导入Mint UI中的组件
// import {Header,Swipe, SwipeItem,Button,Lazyload} from 'mint-ui'
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

//全部导入 Mint UI 
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


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

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


var vm = new Vue({
    el:'#haha',
    render:c=>c(app),
    router, //挂载路由对象到VM实例
    store   //挂载store状态管理对象到VM实例
})
