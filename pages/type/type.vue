<template>
	<view class="type-page">
		<view class="home-bj-top">
			<image mode="widthFix" src="@/static/img/home-top.png"></image>
		</view>

		<Header-Title :title="'分类'"></Header-Title>
		<view class="page-main" :style="{marginTop: `calc(${menuButtonInfo.top}px + ${topRpx})`}">
			<u-tabs :list="typeList" @click="click"></u-tabs>
			<view class="">
				<u-tabs :list="typeTagList" @click="clickTag"></u-tabs>
			</view>
		</view>

		<view class="page-main" :style="{marginTop: `calc(${menuButtonInfo.top}px + ${topRpx})`,
			     height:  `calc(100% - ${menuButtonInfo.top - 30}px)`}">
		</view>
	</view>
</template>

<script>
	import type from './type.js'
	export default type
</script>

<style scoped lang="scss">
	.type-page {
		padding: 0 32rpx;
	}
	.home-bj-top {
		position: fixed;
		z-index: 0;
		top: 0;
		left: 0;
		padding-bottom: 28rpx;
		width: 100%;
		height: 500rpx;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		background-color: #ffffff;

		image {
			width: 100%;
		}
	}

	.page-main {
		width: 100%;
		overflow: auto;

		::-webkit-scrollbar {
			display: none;
		}

		.scroll-Y {
			width: calc(100% - 64rpx);
			padding: 0 32rpx;
		}
	}
</style>