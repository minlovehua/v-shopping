<template>
    <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" 
        @change="countChanged" ref="numbox" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from "../../lib/mui/js/mui.min.js";
    export default{
        mounted(){ //这个生命周期函数：已经将编译好的模板，挂载到了页面指定的容器中显示。
            mui(".mui-numbox").numbox(); //初始化数字选择框
        }, 
        methods:{
            countChanged(){  //每当数量值改变，则立即将最新的数量同步到购物车的store中，覆盖之前的数量值。
            
                //当该商品的numbox文本框的值(商品的数量)一旦发生改变，就立即调用store的mutations中的updateGoodsInfo方法，
                //并将该商品的id和count作为参数传递过去，告诉store要修改的是哪件商品，修改数量值为多少。   
                this.$store.commit("updateGoodsInfo",{id:this.goodsid,count:this.$refs.numbox.value})
            }
        },
        props:['initcount','goodsid']  //子组件通过props获取到父组件通过属性绑定传递过来的数据
    }
</script>

<style lang="scss" scoped>
</style>
