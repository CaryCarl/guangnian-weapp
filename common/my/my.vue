<template>
	<view class="my-page">
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
		
		<view class="footer">
			<view class="">
				V1.0.6
			</view>
			<view class="f24 mt32">
				小橘正在努力开发中~~~
			</view>
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