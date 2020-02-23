<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
                <img v-bind:src="item.img" alt="找不到这张图片" :class="{'full':isfull}">  
                <!-- v-bind绑定的属性，对应的值要到vue数据里面找 -->
                <!-- :class="{'full':isfull}" 当isfull的值为true时，full样式才生效 -->
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        //lunbotuLlist：轮播图数据。isfull：轮播图宽度是否为100%。
        props:["lunbotuList","isfull"]  //props是子组件访问父组件数据的唯一接口
    }
</script>

<style lang="scss" scoped>
    .mint-swipe{  //轮播图 样式
        height: 200px;  //轮播图的高度

        .mint-swipe-item{
            // &:nth-child(1){   //第一张轮播图 
            //     background-color: pink
            // }

            // &:nth-child(2){   //第二张轮播图 
            //     background-color: skyblue
            // }

            // &:nth-child(3){   //第三张轮播图 
            //     background-color: plum
            // }

            text-align:center; //图片也是行内元素

            img{  //轮播图 图片缩放到刚刚好占满轮播图的容器
                //width: 100%;  
                height: 100%;
            }
        }
    }
    .full{
        width:100%;
    }
</style>