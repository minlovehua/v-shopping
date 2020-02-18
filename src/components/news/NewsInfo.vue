<template>
    <div class="newsinfo-container">
        <!-- 大标题 -->
        <h3 class="title">{{newsinfo.title}}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间:{{newsinfo.add_title | dateFormat}}</span>
            <span>点击:{{newsinfo.click}}次</span>
        </p>
        <hr>
        <!-- 内容取 -->
        <div class="content" v-html="newsinfo.content"></div>
        <!-- 评论区  3.使用子组件 -->
        <comment-box :id="this.id"></comment-box>   
        <!-- 属性绑定id ，因为在获取评论数据时要用到它-->
    </div>
</template>

<script>
//1. 导入评论子组件
import comment from '../subcomponents/comment.vue'

import {Toast} from "mint-ui"
export default {
    data(){
        return{
            //将URL地址中传递过来的id值挂载在data上，方便以后调用
            id:this.$route.params.id,
            newsinfo:{} //新闻对象
        }
    },
    created(){ //NewsInfo.vue组件一旦创建，就调用getNewsInfo方法，获取新闻详情数据
        this.getNewsInfo();
    },
    methods:{
        getNewsInfo(){  //获取新闻详情
            this.$http.get('api/getnew/'+this.id).then(result=>{
                if(result.body.status === 0){
                    //console.log(result.body)
                    this.newsinfo = result.body.message[0];
                }else{
                    Toast('获取新闻详情失败！')
                }
            })
        }
    },
    components:{//用来注册子组件的节点
        "comment-box":comment  //2.注册子组件
    }
}
</script>

<style lang="scss">
    .newsinfo-container{
        padding: 0 4px;
        .title{
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            color: red;
        }
        .subtitle{
            font-size: 13px;
            color: #226aff;
            display: flex; //实现两个子元素左右对齐
            justify-content: space-between; //实现两个子元素左右对齐
        }
        .content{
            img{
                width: 100%;
            }
        }
    }
</style>

