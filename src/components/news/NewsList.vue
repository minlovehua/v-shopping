<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <router-link :to="'/home/newsinfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{item.add_time | dateFormat}}</span>
                            <span>点击；{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {Toast} from "mint-ui"

    export default {
        data(){
            return {
                newslist:[] //新闻列表
            }
        },
        created(){ //组件一旦创建就执行获取新闻数据的方法来获取新闻列表
            this.getNewsList(); 
        },
        methods:{
            getNewsList(){
                //获取新闻列表  vue-resource 请求路径最前面不能带斜线 /
                //http://www.liulongbin.top:3005/api/getnewslist
                this.$http.get('api/getnewslist').then(result=>{
                    if(result.body.status === 0){
                        //如果获取数据成功，把数据保存到data上
                        //console.log(result.body.message);
                        this.newslist = result.body.message;
                    }else{
                        Toast("获取新闻列表失败")
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mui-table-view{
        li{
            h1{font-size: 14px;}
        }
        .mui-ellipsis{
            font-size: 12px;
            color: #222ffa;

            //能用 CSS3的flex 就不要用 CSS2的float浮动
            display: flex;
            justify-content: space-between;
        }
    }

</style>