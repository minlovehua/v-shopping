<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
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
            countChanged(){ //每当文本框的数据被修改，立即把最新的数据通过事件，传递给父组件
                // 通过引用对象ref，可以拿到原生的DOM对象。通过DOM对象可以拿到value的值。
                // console.log(this.$refs.numbox.value);

                //通过事件调用，将数据交给父组件
                //数量的加和减，很可能一不小心就涉及到字符串的拼接，所以parseInt使得传递给父组件的是数字。
                //参数1：父组件传递过来的方法的名字；参数2：子组件传递给父组件的内容。
                this.$emit('getcount',parseInt(this.$refs.numbox.value));
            }
        },
        props:["max"],  //props是子组件拿到父组件数据的唯一通道
        watch:{ //通过属性监听来给max赋值
            'max':function(newVal,oldVal){
                //手动调用js，把newVal的值交给data-numbox-max
                //mui(Selector).numbox().setOption('step',5) 官方文档
                //使用JS API给numbox设置最大值
                mui(".mui-numbox").numbox().setOption('max',newVal);

                //动态设置max的值的原因：因为我们不知道什么时候才能拿到真正的值，
                //所以一直在监听，只要max的值改变了，我们就立即将它设置成最大值。
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>