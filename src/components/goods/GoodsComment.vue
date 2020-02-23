<template>
    <div>
        <!-- 3.使用子组件  评论子组件-->
        <commentbox :id="$route.params.id"></commentbox>
    </div>
</template>

<script>
    //1.引入子组件
    import commentbox from "../subcomponents/comment.vue"
    export default{
        //2.注册子组件
        components:{
            commentbox
        }
    }
</script>

<style lang="scss" scoped>

</style>