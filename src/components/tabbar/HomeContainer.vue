<template>
    <div>
        <!-- 轮播图 -->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
                <img v-bind:src="item.img" alt="找不到这张图片">  <!-- v-bind绑定的属性，对应的值要到vue数据里面找 -->
            </mt-swipe-item>
        </mt-swipe>

        <!-- 9宫格 改造成 6宫格 --> 
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                <img src="../../images/menu1.png" alt=""/>
                <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu2.png" alt=""/>
                <div class="mui-media-body">图片分享</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu3.png" alt=""/>
                <div class="mui-media-body">商品购买</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png" alt=""/>
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png" alt=""/>
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu6.png" alt=""/>
                <div class="mui-media-body">联系我们</div></a></li>
        </ul> 
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'

    export default {  //export default {}    导出对象
        data(){
            return {
                lunbotuList:[]   //保存轮播图数组
            }
        },
        created(){  //组件一创建就调用getSwipe方法使用轮播图、获得数据
            this.getSwipe();  
        },
        methods:{
            getSwipe(){ //获取轮播图数据的方法     .then() 指定成功的回调函数。
                //http://www.liulongbin.top:3005/api/getlunbo
                this.$http.get('api/getlunbo').then(result=>{
                    //console.log(result.body);
                    if(result.body.status === 0){ //获取数据成功
                        this.lunbotuList = result.body.message;
                    }else{ //失败
                        Toast('加载轮播图失败');
                    }
                }).catch((e) => {});  
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mint-swipe{  //轮播图 样式
        height: 200px;  //轮播图的高度

        .mint-swipe-item{
            &:nth-child(1){   //第一张轮播图 
                background-color: pink
            }

            &:nth-child(2){   //第二张轮播图 
                background-color: skyblue
            }

            &:nth-child(3){   //第三张轮播图 
                background-color: plum
            }

            img{  //轮播图 图片缩放到刚刚好占满轮播图的容器
                width: 100%;
                height: 100%;
            }
        }
    }

    .mui-grid-view.mui-grid-9{  //六宫格 ul的样式
        background-color:#fff;
        border: none;

        img{  //六宫格 图标样式 改为原图片的一半大
            width: 60px; 
            height: 60px;
        }

        .mui-media-body{  //六宫格 文字样式  改小一点
            font-size: 13px;
        }
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell{ //六宫格 li的样式
        border: 0;
    }
</style>

