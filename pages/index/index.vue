<template>
	<view class="xiaojuchang-page">
		<view v-if="current === 0" class="home-bj-top">
			<image mode="widthFix" src="@/static/img/home-top.png"></image>
		</view>
		<Header-Title :title="current === 0?'首页':'我的'"></Header-Title>
		
		<view v-if="current === 0">
			<!-- <Ball-Spin v-if="spinState"></Ball-Spin> -->
			<view class="home-main" :style="{marginTop: `calc(${menuButtonInfo.top}px + ${topRpx})`,
			     height:  `calc(100vh - ${menuButtonInfo.top}px - ${topRpx})`}">
				<view>
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll"
						:style="{height:  `calc(100vh - ${menuButtonInfo.top}px - ${topRpx})`}">
						<!-- <view class="banner" v-if="homeHeader">
							<u-swiper height="245rpx" indicator indicatorMode="dot" interval="8000" :list="homeHeader"
								keyName="imageUrl" @click="clickSwiper"></u-swiper>
						</view> -->

						<view v-if="featuredList.length > 0">
							<view class="box-header qz-fl-sb mt36 mb12">
								<view class="header-title">每日一图</view>
							</view>
							<view class="grid-size recommend">
								<view class="jq-row mb32" v-for="(item,i) in featuredList" :key="i"
									@click="onImg(item)">
									<image class="jq-img" mode="aspectFill" :src="item.cover_image"></image>
								</view>
							</view>
						</view>

						<view>
							<view class="box-header qz-fl-sb mt36 mb12">
								<view class="header-title">表情包头像</view>
							</view>
							<view class="grid-size qz-fl-sb-wrap" v-if="imageGroups.length > 0">
								<view class="jq-row mb32" v-for="(item,i) in imageGroups" :key="i" @click="onImg(item)">
									<image class="jq-img" mode="aspectFill" :src="item.cover_image"></image>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<My v-if="current === 1"></My>
		<Recharge-Template @onTab="onTab" :current="current"></Recharge-Template>
	</view>
</template>

<script>
	import index from './index.js'
	export default index
</script>

<style scoped lang='scss'>
	@import './index.scss';
</style>