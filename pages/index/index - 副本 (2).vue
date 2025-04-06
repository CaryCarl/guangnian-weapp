<template>
	<view class="index-page">
		<view v-if="current === 0" class="home-bj-top">
			<image mode="widthFix" src="@/static/img/home-top.png"></image>
		</view>
		<Header-Title :title="current === 0?'首页':'我的'"></Header-Title>
		<Ball-Spin v-if="isLoading"></Ball-Spin>
		
		<view class="page-main" :style="{marginTop: `calc(${menuButtonInfo.top}px + ${topRpx})`,
				     height:  `calc(100% - ${menuButtonInfo.top - 100}px)`}">
			<view v-show="current === 0" class="home-main">
			
				<view v-if="featuredList.length > 0">
					<view class="box-header qz-fl-sb mt36 mb12">
						<view class="header-title">推荐</view>
					</view>
					<view class="grid-size recommend">
						<view class="jq-row mb32" v-for="(item,i) in featuredList" :key="i" @click="onImg(item)">
							<image class="jq-img" mode="aspectFill" :src="item.cover_image"></image>
						</view>
					</view>
				</view>
			
				<view>
			
					<view class="grid-size qz-fl-sb-wrap" v-if="imageGroups.length > 0">
						<view class="jq-row mb32" v-for="(item,i) in imageGroups" :key="i" @click="onImg(item)">
							<image :lazy-load="true" class="jq-img" mode="aspectFill" :src="item.cover_image"></image>
						</view>
					</view>
				</view>
			</view>
			
			<My v-if="current === 1" :style="{marginTop: `calc(${menuButtonInfo.top}px + ${topRpx})`,
				     height:  `calc(100% - ${menuButtonInfo.top - 70}px)`}"></My>
		</view>
		<!-- <Recharge-Template @onTab="onTab" :current="current"></Recharge-Template> -->
	</view>
</template>

<script>
	import index from './index.js'
	export default index
</script>

<style scoped lang='scss'>
	@import './index.scss';
</style>