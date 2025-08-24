<template>
	<view class="type-page">
		<view class="home-bj-top">
			<image mode="widthFix" src="@/static/img/home-top.png"></image>
		</view>
		<Header-Title :title="'免费资源'"></Header-Title>
		<Ball-Spin v-if="isLoading"></Ball-Spin>

		<view class="home-content" :style="{ marginTop: `calc(${menuButtonInfo.top}px + ${topRpx})` }">
			<view class="type-list">
				<view v-for="(item, index) in typeList" :key="index" class="type-item" @click="clickType(item)" :style="{
					color: typeId === item.id ? '#fa4d4c' : '#000000',
					fontWeight: typeId === item.id ? 'bold' : 'normal'
				}">
					{{ item.name }}
				</view>
			</view>

			<view class="home-main">
				<view class="ch-tabs">
					<view @click="clickTag(item)" :class="['tag ', tagId === item.id ? 'ch-tabs-active' : '']"
						v-for="(item, i) in typeTagList" :key="i">
						{{ item.name }}
					</view>
				</view>

				<view class="home-main-content">
					<view class="" style="display: flex;justify-content: center;align-items: center;">
						<img v-if="resourceList.length === 0" src="@/static/img/data-no.png"
						style="width:35%;margin-top: 100rpx;" mode="widthFix"></img>
					</view>

					


					<u-list @scrolltolower="scrolltolower">
						<u-list-item v-for="(item, index) in resourceList" :key="index">
							<view class="resource-item-container">
								<view class="resource-item" @click="goDetail(item)">
									<view class="resource-item-img">
										<image :src="item.cover_image" mode="widthFix"></image>
									</view>
									<view class="resource-item-content">
										<view class="resource-item-title">
											{{ item.title }}
										</view>
										<view class="resource-item-btn">
											<view @click.stop="goDetail(item)" class="resource-item-btn-1">
												<image src="@/static/img/baidu.png" style="border-radius: 38rpx;"
													mode="widthFix"></image>
											</view>
										</view>
									</view>
								</view>

							</view>

						</u-list-item>
						<view style="height: 320rpx; width: 100%;">
						</view>
					</u-list>




				</view>

			</view>

		</view>

		<!-- <u-modal :show="show" :title="zyTitle" confirmText="复制" :content='baidu_pan_url' @confirm="copyUrl"></u-modal> -->
	</view>
</template>

<script>
import resource from './resource.js'
const lineBg =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAOCAYAAABdC15GAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFxSURBVHgBzZNRTsJAEIb/WTW+lpiY+FZPIDew3ABP4GJ8hxsI9zBpOYHeQDwBPQI+mRiRvpLojtPdYhCorQqF/6GdbGd2vvwzBXZcNAt4oj1ANeUoAT5iqkUjbEFLHNmhD1YPEvpZ3ghkGlVDCkc94/BmHMq998I5ONiY1ZBfpKAyuOtgAc5yOEDmYEWNh32BHF91sGHZHmwW4azciN9aQwnz3SJEgOmte+R2tdLprTYoa50mvuomlLpD4Y3oQZnov6D2RzCqI93bWOHaEmAGqQUyRBlZR1WfarcD/EJ2z8DtzDGvsMCwpm8XOCfDUsVOCYhiqRxI/CTQo4UOvjzO7Pow18vfywneuUHHUUxLn55lLw5JFpZ8bEUcY8oXdOLWiHLTxvoGpLqoUmy6dBT15o/ox3znpoycAmxUsiJTbs1cmxeVKp+0zmFIS7bGWiVghC7Vwse8jFKAX9eljh4ggKLLv7uaQvG9/F59Oo2SouxPu7OTCxN/s8wAAAAASUVORK5CYII=";

export default resource
</script>

<style scoped lang="scss">
@import './index.scss';
</style>