<template>
    <div class="app-container">
        <!-- 顶部Header区域 -->
        <mt-header fixed title="Vue商城"></mt-header>

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
					<span class="mui-badge">0</span>
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

</script>

<style lang="scss" scoped>   //使用局部样式
    .app-container{
        padding-top: 40px;
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

