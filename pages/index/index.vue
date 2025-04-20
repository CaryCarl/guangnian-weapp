<template>
	<view class="index-page">
		<view  class="home-bj-top">
			<image mode="widthFix" src="@/static/img/home-top.png"></image>
		</view>
		<Header-Title :title="current === 0?'小橘图库':'我的'"></Header-Title>

		<Ball-Spin v-if="isLoading"></Ball-Spin>
		<view class="home-main" :style="{marginTop: `calc(${menuButtonInfo.top}px + ${topRpx})`,
			     height:  `calc(100% - ${menuButtonInfo.top - 30}px)`}">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll"
				:style="{height:  `calc(100vh - ${menuButtonInfo.top}px - ${topRpx})`}">
				<view class="box-header qz-fl-sb mt36 mb12">
					<view class="header-title">推荐</view>
				</view>
				<view class="grid-size recommend">
					<view class="jq-row mb32" v-for="(item,i) in featuredList" :key="i" @click="onImg(item)">
						<image class="jq-img" mode="aspectFill" :src="item.cover_image"></image>
					</view>
				</view>
				<view class="grid-size qz-fl-sb-wrap" v-if="imageGroups.length > 0">
					<view class="jq-row mb32" v-for="(item,i) in imageGroups" :key="i" @click="onImg(item)">
						<image  class="jq-img"  mode="aspectFill" :src="item.cover_image"></image>
						<!-- :lazy-load="true" -->
					</view>
				</view>
			</scroll-view>
		</view>

		<My v-show="current === 1"></My>
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