<template>  <!-- 图片列表 -->
    <div>

        <!-- 顶部滑动区域 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id == 0?'mui-active':'']" v-for="item in cates" :key="item.id"
                     @tap="getPhotoListByCateId(item.id)">    <!-- 只有mui中可以用tap来替代click -->
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
                <!-- 为 img 元素添加 v-lazy 指令，指令的值为图片的地址。同时需要设置图片在加载时的样式。 -->
                <img v-lazy="item.img_url">
                <!-- 图片底部的文字 -->
                <div class="info">  
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    //1.引入mui的js文件
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        data(){
            return {
                cates:[], //所有分类的列表数组
                list:[]  //图片列表数组
            };
        },
        created(){ //一创建组件，就立刻获取所有分类列表数据
            this.getAllCategory();
            //默认进入页面，就主动请求所有图片列表的数据
            this.getPhotoListByCateId(0); 
        },
        mounted(){ //当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
            //如果要操作元素，最好在mounted里面，因为这时候的DOM元素是最新的
            
            //2.初始化滑动控件 （要先拿到DOM元素，才能去初始化并触发它的滑动）
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });

        },
        methods:{
            getAllCategory(){
                //获取所有图片的分类
                this.$http.get("api/getimgcategory").then(result=>{
                    if(result.body.status === 0){
                        //手动拼接出一个最完整的分类列表（向数组的开头添加“全部”分类
                        result.body.message.unshift({title:"全部",id:0});
                        this.cates = result.body.message;
                    }
                });
            },
            getPhotoListByCateId(cateId){ //根据分类id获取图片列表
                this.$http.get('api/getimages/'+cateId).then(result=>{
                    if(result.body.status === 0){
                        console.log(result.body);
                        this.list = result.body.message; //将获取到的数据挂载到该组件的data上
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    * {
        touch-action: pan-y;
    }

    .photo-list{          //ul的样式
        list-style: none; //去掉li左边的小点点
        margin:0;         //让ul占满屏幕
        padding: 10px;       //让图片左右有点边距
        padding-bottom: 0;   //去掉ul底部的padding
        li{
            position: relative; //“子绝父相” 让文字不占位置，飘在图片上方
            background-color: #ccc;
            text-align: center;  //让懒加载的小图标水平居中
            margin-bottom: 10px; //让li之间有点间隙
            box-shadow: 0 0 9px #999; //给图片边框加阴影

            img{         
                vertical-align: middle; //解决图片3像素问题
                width: 100%; //让普通图片占满整个ul
            }

            img[lazy=loading] { //这就是懒加载的图片
            width: 40px;
            height: 300px;
            margin: auto;
            }

            .info{                      //图片底部文字
                position: absolute;     //“子绝父相” 让文字不占位置，飘在图片上方
                bottom: 0;              //偏移 将文字飘在图片底部

                color: white;         //文字 白色
                text-align: left;       //文字 居左

                background-color: rgba(0,0,0,0.3);//文字底部透明度

                max-height: 84px;       //设置文字最大高度，防止文字太多太高遮住图片太多

                .info-title{            //图片底部文字 标题
                    font-size: 14px;
                }

                .info-body{             //图片底部文字 内容
                    font-size: 13px;
                }
            }
        }
    }
</style>
