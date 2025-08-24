<template>
	<view class="">
		<view class="my-page" :style="{top: `calc(${menuButtonInfo.top}px + ${topRpx})`,
				     height:  `calc(100% - ${menuButtonInfo.top - 70}px)`}">
			<view class="user-box qz-fl-start">
				<image class="user-img mr32" src="@/static/img/zjz.png" />
				<view>微信用户</view>
			</view>

			<view class="list mt32">
				<view class="list-item" @click="change()">
					<text>收藏</text>
					<image class="left-img mr32" src="@/static/img/you.png" />
				</view>
			</view>
			<!-- <view class="list mt32">
				<view class="list-item" @click="changeMd()">
					<text>更新日志</text>
					<image class="left-img mr32" src="@/static/img/you.png" />
				</view>
			</view> -->
			
			<view class="mt50 f28 " style="text-align: center; opacity: .75;">免费分享资源</view>
			<view class="mt50 f28 " style="text-align: center; opacity: .75;">努力更新中...</view>
		</view>
	</view>
</template>

<script>
	import my from './my.js';
	export default my;
</script>

<style scoped lang="scss">
	@import './my.scss';
</style>