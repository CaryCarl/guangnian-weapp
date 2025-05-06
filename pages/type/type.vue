<template>
	<view class="type-page">
		<view class="home-bj-top">
			<image mode="widthFix" src="@/static/img/home-top.png"></image>
		</view>
		<Header-Title :title="'分类'"></Header-Title>
		<Ball-Spin v-if="isLoading"></Ball-Spin>
		<view class="header-main" :style="{marginTop: `calc(${menuButtonInfo.top}px + ${topRpx})`}">
			<u-tabs :list="typeList" @click="click" :lineColor="`url(${lineBg}) 100% 100%`" :activeStyle="{
			        color: '#303133',
			        fontWeight: 'bold',
			        transform: 'scale(1.05)'
			    }" :inactiveStyle="{
			        color: '#606266',
			        transform: 'scale(1)'
			    }" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"></u-tabs>
			<view class="ch-tabs">
				<u-tabs :list="typeTagList" @click="clickTag" lineColor="#f56c6c"></u-tabs>
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
				<view class="" style="width: 100%;height: 150rpx;">

				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import type from './type.js'
	const lineBg =
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAOCAYAAABdC15GAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFxSURBVHgBzZNRTsJAEIb/WTW+lpiY+FZPIDew3ABP4GJ8hxsI9zBpOYHeQDwBPQI+mRiRvpLojtPdYhCorQqF/6GdbGd2vvwzBXZcNAt4oj1ANeUoAT5iqkUjbEFLHNmhD1YPEvpZ3ghkGlVDCkc94/BmHMq998I5ONiY1ZBfpKAyuOtgAc5yOEDmYEWNh32BHF91sGHZHmwW4azciN9aQwnz3SJEgOmte+R2tdLprTYoa50mvuomlLpD4Y3oQZnov6D2RzCqI93bWOHaEmAGqQUyRBlZR1WfarcD/EJ2z8DtzDGvsMCwpm8XOCfDUsVOCYhiqRxI/CTQo4UOvjzO7Pow18vfywneuUHHUUxLn55lLw5JFpZ8bEUcY8oXdOLWiHLTxvoGpLqoUmy6dBT15o/ox3znpoycAmxUsiJTbs1cmxeVKp+0zmFIS7bGWiVghC7Vwse8jFKAX9eljh4ggKLLv7uaQvG9/F59Oo2SouxPu7OTCxN/s8wAAAAASUVORK5CYII=";

	export default type
</script>

<style scoped lang="scss">
	@import './index.scss';
</style>