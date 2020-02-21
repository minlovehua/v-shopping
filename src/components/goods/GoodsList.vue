<template>
    <div class="goods-list">
        <div class="goods-item" v-for="item in goodslist" :key="item.id">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">{{item.sell_price}}元</span>
                    <span class="old">{{item.market_price}}元</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){ //挂载本组件内部的私有数据
            return{
                pageindex:1,//分页的页数，默认为第1页
                goodslist:[]  //存放商品列表的数组
            }
        },
        created(){ //组件一旦创建，就立刻获取商品列表数据
            this.getGoodsList(); //默认获取第1页的数据
        },
        methods:{
            getGoodsList(pageindex){ //获取商品列表
                this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result=>{
                    if(result.body.status === 0){
                        //将获取到的数据挂载到data上
                        this.goodslist = result.body.message;
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .goods-list{
        display: flex; 
        flex-wrap: wrap; //换行，第一行排满了就排下一行
        padding: 7px; //上下左右有间隙
        justify-content: space-between; //两边对齐
        .goods-item{
            //一个商品的宽度占49%，则一行可以放下两个商品
            width: 49%;    //不写50%，让图片之间留点间隙
            padding: 2px;  //让文字和图片都没那么紧挨着边框
            border: 1px solid #ccc; //边框
            box-shadow: 0 0 8px #ccc; //阴影
            margin: 4px 0; //使得商品上下之间有间隙

            display:flex; //弹性盒子
            flex-direction: column; //主轴垂直朝下（如果不指定，则主轴水平朝右）
            justify-content: space-between; //子元素两端对齐

            min-height:293px; //设置最小高度，使得图片没加载出来时，框不至于缩太短。

            img{
                width: 100%; //让图片按比例缩放占满它的父容器
            }
            .title{
                font-size: 14px;
            }
            .info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 5px;
                }
                .price{
                    .now{
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>
