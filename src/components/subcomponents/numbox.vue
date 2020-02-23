<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from "../../lib/mui/js/mui.min.js";
    export default{
        mounted(){ //这个生命周期函数：已经将编译好的模板，挂载到了页面指定的容器中显示。
            //初始化数字选择框
            mui(".mui-numbox").numbox();
        }
    }
</script>

<style lang="scss" scoped>

</style>