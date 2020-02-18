<template>
    <div class="comment-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入评论内容(最多输入120字)" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>
        <div class="comment-list">
            <div class="comment-item"  v-for="(item,i) in comments" :key="i">
                <div class="comment-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time|dateFormat}}
                </div>
                <div class="comment-body">{{item.content === 'undefined'?'此用户很懒，啥也没说。' : item.content}}</div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>

</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            pageIndex:1, //默认展示第1页数据
            comments:[]  //所有的评论数据
        };
    },
    created(){
        this.getComments(); //别老是忘记前面的 this.
    },
    methods:{
        getComments(){ //获取评论
            //http://www.liulongbin.top:3005/api/getcomments/:artid?pageindex=1
            this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result=>{
                if(result.body.status === 0){
                    //console.log(result.body);
                    //this.comments = result.body.message;
                    //每当获取新评论，不要把旧数据清空，而是新数据拼接到旧数据后面
                    this.comments=this.comments.concat(result.body.message);
                }else{
                    Toast("获取评论数据失败！");
                }
            });
        },
        getMore(){ //加载更多评论
            this.pageIndex++;
            this.getComments();
        }
    },
    props:["id"]  //显示定义一下id
}
</script>

<style lang="scss" scoped>
    .comment-container{
        h3{
            font-size: 18px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;  //让textarea和“发表评论”按钮之后的间隙小一点
        }
        .comment-list{
            margin: 5px 0;
            .comment-item{
                font-size: 13px;
                .comment-title{
                    line-height: 30px;
                    background-color: #ccc;
                }
                .comment-body{
                    line-height: 35px;
                    text-indent: 2em; //缩进2em
                }
            }
        }
    }
</style>
