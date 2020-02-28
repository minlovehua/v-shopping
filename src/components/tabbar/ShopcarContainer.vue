<template>
    <div class="shopcar-container">
        <!-- 商品列表区 -->
        <div class="goods-list">
            <div class="mui-card" v-for="(item,i) in goodsList" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
                        @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                 <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox> <!-- 3.使用子组件 -->
                                 <!-- .prevent阻止a链接的默认跳转行为。 -->
                                 <!-- 参数i是用来删除goodsList中的数据的。 -->
                                 <!-- 参数id是用来删除store中的数据的。 -->
                                 <a href="#" @click.prevent="remove(item.id,i)">删除</a>   
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 结算区 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计(不含运费)</p>
                        <p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，
                        总价<span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
        <p>{{$store.getters.getGoodsSelected}}</p>
    </div>
</template>

<script>
    //1.导入子组件 
    import numbox from '../subcomponents/shopcar_numbox.vue'
    export default{
        data(){
            return {
               goodsList:[] //购物车所有商品数据
            }
        },
        created(){
            this.getGoodsList();
        },
        methods:{
            getGoodsList(){
                var idArr = [];
                //先将所有id放在一个数组里
                this.$store.state.car.forEach(item=>idArr.push(item.id));
                //如果购物车car数组为空，则直接返回,不需要请求数据接口，否则会报错
                if(idArr.length<=0){
                    return; 
                }
                //join() 方法用于把数组中的所有元素放入一个字符串。元素是通过指定的分隔符进行分隔的。
                //idArr.join(",") 拼接idArr数组中的id,拼成一个用逗号隔开id的字符串
                //获取购物车商品列表      
                this.$http.get('api/goods/getshopcarlist/'+idArr.join(",")).then(result=>{
                    if(result.body.status === 0){
                        // console.log(result.body.message);
                        this.goodsList = result.body.message;
                    }
                })
            },
            remove(id,index){//点击“删除”
                // 把当前组件的goodslist中对应要删除的那个商品根据index删除。
                this.goodsList.splice(index,1);  //从下标为index的那个开始删，删掉1个。
                //调用store的mutations中的removeFromCar方法，根据id把商品从store中删除。
                this.$store.commit("removeFromCar",id); 
            },
            selectedChanged(id,val){   //监听开关状态变化的change方法
                //每当点击开关，调用store中mutations的updateGoodsSelected方法来将最新的开关状态同步到store中
                // console.log(id + '--->' + val);
                this.$store.commit('updateGoodsSelected',{id,selected:val});
            }
        },
        components:{ //2.注册子组件
            numbox  
        }
    }
</script>

<style lang="scss" scoped>
    .shopcar-container{
        background-color:#eee;  //背景色：浅灰色
        overflow:hidden; //解决margin-top和margin-bottom不起效的问题
        .goods-list{
            .mui-card-content-inner{
                display:flex;  //让子元素排成一排
                align-items:center; //让子元素垂直居中
            }
            img{
                width:60px;
                height:60px;
            }
            h1{
                font-size:13px;
            }
            .info{
                .price{
                    color:red;
                    font-weight:bold;
                }
                p{
                    margin-top:10px;
                    margin-bottom:0;
                }
            }

        }
        .jiesuan{
            display: flex;                   //弹性盒子  默认子元素一行一行水平排列
            justify-content: space-between;  //子元素居两端
            align-items: center;             //子元素垂直居中
            .red{
                color:red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
</style>
