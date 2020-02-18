<template>
    <div>
        <!-- <h3>图片列表</h3> -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a class="mui-control-item mui-active" href="#item1mobile" data-wid="tab-top-subpage-1.html">
                        推荐
                    </a>
                    <a class="mui-control-item" href="#item2mobile" data-wid="tab-top-subpage-2.html">
                        热点
                    </a>
                    <a class="mui-control-item" href="#item3mobile" data-wid="tab-top-subpage-3.html">
                        北京
                    </a>
                    <a class="mui-control-item" href="#item4mobile" data-wid="tab-top-subpage-4.html">
                        社会
                    </a>
                    <a class="mui-control-item" href="#item5mobile" data-wid="tab-top-subpage-5.html">
                        娱乐
                    </a>
                    <a class="mui-control-item" href="#item6mobile" data-wid="tab-top-subpage-6.html">
                        科技
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    //1.引入mui的js文件
    import mui from '../../lib/mui/js/mui.min.js'
 
    export default {
        data(){
            return {

            };
        },
        mounted(){ //当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
            //如果要操作元素，最好在mounted里面，因为这时候的DOM元素是最新的
            
            //2.初始化滑动控件 （要先拿到DOM元素，才能去初始化并触发它的滑动）
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });

        },
        methods:{

        }
    }
</script>

<style lang="scss" scoped>
    * {
        touch-action: pan-y;
    }
</style>
