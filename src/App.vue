<template>
    <div class="app-container">
        <!-- 顶部Header区域 -->
        <mt-header fixed title="Vue商城">
			<span slot="left" @click="goBack" v-show="flag">
				<mt-button icon="back">返回</mt-button>
			</span>
		</mt-header>

        <!-- 中间的路由 router-view 区 -->
		<!-- 用来放对应组件到的“坑”，点击路由链接，改路由链接对应的组件会在这里显示-->
		<transition>
			<router-view></router-view>
		</transition>
		
        <!-- 底部Tabber区域 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<!-- 获取Vuex的store中的getters提供的数据的方式 this.$store.getters.xxx -->
					<!-- <span class="mui-badge" id="badge">{{this.$store.getters.sumCount}}</span> -->
					<span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
    </div>
</template>

<script>
	export default{
		data(){
			return {
				flag:false  //默认为 false
			}
		},
		created(){ //created钩子函数：实例已经在内存中创建OK，此时 data 和 methods 已经创建OK，此时还没有开始 编译模板。
			this.flag = this.$route.path === "/home" ? false : true;
		},
		methods:{
			goBack(){ //点击后退(返回)
				this.$router.go(-1)
			}
		},
		watch:{ //实时监听url地址中的$route.path，如果是首页(/home),隐藏“返回”按钮
			"$route.path":function(newVal){
				if(newVal === "/home"){
					this.flag = false
				}else{
					this.flag = true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>   //使用局部样式

	.mint-header{
		z-index: 99; //让Header在最上方，不会被其它元素遮挡
	}

    .app-container{ //根组件容器div
        padding-top: 40px;
		padding-bottom: 60px;
		overflow-x: hidden; //实现 界面底部不出现滚动条
    }

	.v-enter{
		opacity: 0;
		transform: translateX(100%); //从右进来
	}

	.v-leave-to{
		opacity: 0;
		transform: translateX(-100%); //往左消失
		position: absolute; //实现新进入的组件不往下飘
	}

	.v-enter-active,
	.v-leave-active{
		transition: all 0.5s ease;
	}
</style>

