<template>
	<view class="my-page">
		<view class="user-box qz-fl-start">
			<image class="user-img mr32" src="@/static/img/zjz.png" />
			<view>微信用户</view>
		</view>

		<view class="list mt32">
			
			<button open-type="share" class="list-item qz-fl-sb share" @click="onShare">
				<view class="list-name">
					<image class="left-img" mode="widthFix" src="@/static/img/fenxiang.png" />
					分享给好友
				</view>
				<view class="">
					<image class="jiantou-you" mode="widthFix" src="@/static/img/jiantou-you.png">
					</image>
				</view>
			</button>

			
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