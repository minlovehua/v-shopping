<template>
    <div class="goodsinfo-container">

        <!-- 半场动画不能用类，只能用构造函数  -->
        <transition      
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
            <!-- 因为小球属于当前界面，所以在组件内容可以直接通过 ref 来获取到这个小球。 -->
        </transition>

        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!-- 3.使用轮播图子组件 -->
                    <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>

        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价:<del>{{goodsinfo.market_price}}元</del>&nbsp;&nbsp;
                        销售价:<span class="now_price">{{goodsinfo.sell_price}}元</span>
                        <p>购买数量:<numbox :max="goodsinfo.stock_quantity" @getcount="getSelectedCount"></numbox></p>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{goodsinfo.goods_no}}</p>
                    <p>库存情况:{{goodsinfo.stock_quantity}}件</p>
                    <p>上架时间:{{goodsinfo.add_time|dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <!--<br>不生效，说明父元素使用flex布局了，因为使用flex布局之后，所有元素呈现一排排列.解决办法：去掉父元素的flex布局。 -->
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    //1.引入子组件
    import swiper from "../subcomponents/swiper.vue"  //轮播图子组件
    import numbox from "../subcomponents/numbox.vue"   //numbox子组件
    export default {
        data(){
            return{
                //将路由参数对象中的id挂载到data上，方便后期调用
                id:this.$route.params.id,  //商品的id
                lunbotu:[], //轮播图数据 默认是一个空数组
                goodsinfo:{}, //商品信息数据 默认是一个空对象
                ballFlag:false, //控制小球隐藏和显示的标识符，默认隐藏
                selectedCount:1 //购买数量 默认为1
            }
        },
        created(){ //实例已经在内存中创建OK，此时 data 和 methods 已经创建OK，此时还没有开始编译模板。
            this.getLunbotu(); //组件一旦创建，就获取轮播图数据
            this.getGoodsInfo(); //组件一旦创建，就获取商品详情的数据
        },
        methods:{
            getLunbotu(){  //获取轮播图信息
                this.$http.get('api/getthumimages/'+this.id).then(result=>{
                    if(result.body.status === 0){
                        //先循环轮播图数组的每一项，为item添加img属性，因为轮播图组件中，只能识别item.img，不能识别item.src。
                        result.body.message.forEach(item=>{
                            item.img=item.src;
                        });
                        this.lunbotu = result.body.message;
                    }
                })
            },
            getGoodsInfo(){ //获取轮播图信息
                this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                    if(result.body.status === 0){
                        console.log(result.body); //打印获取到的数据看看
                        this.goodsinfo = result.body.message[0];
                    }
                })
            },
            goDesc(id){ //点击使用编程式导航跳转到图文介绍页面
                this.$router.push({name:"goodsdesc",params:{id}})
            },
            goComment(id){ //点击使用编程式导航跳转到评论页面
                this.$router.push({name:"goodscomment",params:{id}})
            },
            addToShopCar(){ 
                //点击“加入购物车”按钮，切换显示或隐藏小球
                this.ballFlag = !this.ballFlag;

                // 商品对象 {id:商品id,count:购买数量,price:商品单价,selected:是否选中进行结算}
                // 要保存到store中的car数组中 商品对象
                var goodsinfo = {
                    id:this.id,
                    count:this.selectedCount,
                    price:this.goodsinfo.sell_price,
                    selected:true
                }

                //调用mutations中的方法的方式 this.$store.commit('方法的名字','按需传递的参数')
                //调用store中mutations的addToCar方法来将商品加入购物车（即修改store中商品的数据）
                this.$store.commit('addToCar',goodsinfo)
            },
            beforeEnter(el){
                el.style.transform="translate(0,0)"; //一开始在原始位置
            },
            enter(el,done){
                el.offsetWidth; //这行代码没有实际意义，如果不写，就没有动画效果

                //获取小球在页面中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                //获取徽标在页面中的位置
                const badgePosition=document.getElementById("badge").getBoundingClientRect();
                //小球到徽标的距离x轴方向距离和y轴方向距离
                const xDist=badgePosition.left-ballPosition.left;
                const yDist=badgePosition.top-ballPosition.top;

                el.style.transform=`translate(${xDist}px,${yDist}px)`; //ES6的模板字符串
                el.style.transition="all 1s cubic-bezier(0,0,.25,1)"; //cubic-bezier(0,0,.25,1)是个移动曲线
                done() //这代表afterEnter(el){this.ballFlag = !this.ballFlag;}引用
            },
            afterEnter(el){
                this.ballFlag = !this.ballFlag; //小球到达购物车之后，消失
            },
            getSelectedCount(count){  //获取购买数量
                //当子组件把选中的数量传递给父组件的时候，把选中的值保存到data上。
                this.selectedCount = count;
                console.log('父组件拿到的子组件传递过来的数据：'+this.selectedCount);
            }
        },
        components:{ //2. 注册子组件
            swiper,numbox
        }
    }
</script>

<style lang="scss" scoped>
    .goodsinfo-container{
        background-color:#eee;
        overflow: hidden;
        .now_price{
            color:red;
            font-size:16px;
            font-weight:bold;
        }
        .mui-card-footer{
            display:block;
            button{
                //上下10px,左右0px。让按钮之间有点间隙不至于紧挨在一起。
                margin:15px 0; 
            }
        }

        .ball{
            width: 15px;
            height: 15px;
            border-radius:50%;
            background-color:pink;
            
            position: absolute;
            z-index:99;
            top:389px;
            left:139px;
        }
    }
</style>
