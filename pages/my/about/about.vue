<template>
	<view>
		<view class="mt32 pl32 f24">
			<view class="mt24" v-for="(item,i) in mdList " :key="i">
				<view class="f28">
					{{item.v}}
				</view>

				<view v-for="(itemJ, j) in item.value" :key="j" style="opacity: 0.7;">
					<view class="mt10 mb10">
						• {{itemJ}}
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="f30 mt32">
				小橘正在努力开发中~~
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mdList: [
					{
						v: "V1.0.13",
						value: ["优化 不同图片大小压缩质量"]
					},
					{
						v: "V1.0.12",
						value: ["优化 查询分类"]
					},{
						v: "V1.0.11",
						value: ["优化 分类页面UI"]
					},
					{
						v: "V1.0.10",
						value: ["修复 分享入口进入首图加载路径转义"]
					},
					{
						v: "V1.0.9",
						value: ["增加 图片详情页面分享好友功能", "修复 图片下载失败问题"]
					}
				]
			};
		}
	}
</script>

<style lang="scss" scoped>
	.footer {
		position: absolute;
		left: 0;
		width: 100%;
		z-index: 999;
		bottom: 400rpx;
		text-align: center;
	}
</style>