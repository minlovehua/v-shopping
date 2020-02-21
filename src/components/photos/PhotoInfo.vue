<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoinfo.add_time|dateFormat}}</span>
            <span>点击：{{photoinfo.click}}次</span>
        </p>

        <hr>

        <!-- 缩略图区域 -->
        <div class="thumbs">
            <img class="preview-img" v-for="(item,index) in list" :src="item.src" 
            height="100" @click="$preview.open(index,list)" :key="item.src">
        </div>

        <!-- 图片内容区域 -->  <!--因为 content中带有html标签，所以用v-html来渲染文本-->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 3.放置一个现成的 评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
    //1.导入评论子组件
    import comment from '../subcomponents/comment.vue'
    export default {
        data(){
            return {
                id:this.$route.params.id,  //从URL地址中获取id的值
                photoinfo:{}, //图片详情 
                list:[] //缩略图的数组
            };
        },
        created(){
            this.getPhotoInfo();
            this.getThumbs();
        },
        methods:{
            getPhotoInfo(){ //获取图片详情
                this.$http.get("api/getimageInfo/"+this.id).then(result=>{
                    if(result.body.status === 0){
                        //这里message是个数组[]，里面只有一个元素，所以要这样子访问
                        //console.log(result.body.message[0]);
                        this.photoinfo = result.body.message[0]; 
                    }
                })
            },
            getThumbs(){  //获取缩略图
                this.$http.get('api/getthumimages/'+this.id).then(result=>{
                    if(result.body.status === 0){
                        //循环每个图片，补全图片的宽和高
                        result.body.message.forEach(item => {
                            item.w = 600;
                            item.h = 400;
                        });
                        //把完整的数据保存到data上的list中
                        this.list = result.body.message;
                    }
                })
            }
        },
        components:{ 
            'cmt-box':comment  //2.注册评论子组件
        }
    }
</script>

<style lang="scss" scoped>
    .photoinfo-container{
        padding:3px;
        h3{
            color:#26A2FF;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle{
            display: flex;  //让子元素左右对齐
            justify-content: space-between; //让子元素左右对齐
            font-size: 13px;
        }
        .content{
            font-size: 13px;
            line-height: 30px;
        }

        .thumbs{ //缩略图的样式
            img{
                margin: 10px;   //让缩略图之间有间隙
                box-shadow: 0 0 8px #999; //缩略图的阴影
            }
        }
    }
</style>
