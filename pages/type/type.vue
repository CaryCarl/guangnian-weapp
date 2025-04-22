<template>
	<view class="type-page">
		<view class="home-bj-top">
			<image mode="widthFix" src="@/static/img/home-top.png"></image>
		</view>
		<Header-Title :title="'分类'"></Header-Title>
		<Ball-Spin v-if="isLoading"></Ball-Spin>
		<view class="header-main" :style="{marginTop: `calc(${menuButtonInfo.top}px + ${topRpx})`}">
			<u-tabs :list="typeList" @click="click"></u-tabs>
			<view class="ch-tabs">
				<u-tabs :list="typeTagList" @click="clickTag"></u-tabs>
			</view>
		</view>
		<view class="home-main" :style="{marginTop: `calc(${menuButtonInfo.top+85}px + ${topRpx})`,
			     height:  `calc(100% - ${menuButtonInfo.top+130}px)`}">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll"
				:style="{height:  `calc(100vh - ${menuButtonInfo.top}px - ${topRpx})`}">
				<view class="grid-size qz-fl-sb-wrap" v-if="imageList.length > 0">
					<view class="jq-row mb32" v-for="(item,i) in imageList" :key="i" @click="onImg(item)">
						<image class="jq-img" mode="aspectFill" :src="item.url + '?imageMogr2/thumbnail/!20p'"></image>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import type from './type.js'
	export default type
</script>

<style scoped lang="scss">
	@import './index.scss';
</style>