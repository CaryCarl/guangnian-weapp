<template>
	<view class="vtop" :style="{ marginTop: menuButtonInfo.top + 'px' }">
		<view class="backj-img" v-if="back || colorStr === '#000000'" @click="onBack()">
			<image class="img" src="https://qiezidj-resource.oss-cn-shenzhen.aliyuncs.com/static/fanhui-black.png"
				mode=""></image>
		</view>
		<view class="title" :style="{ textAlign: mode, color: colorStr, paddingRight: colorStr === '#000000' ? '50rpx' : '0' }">
			{{ title }}
		</view>
	</view>
</template>

<script>
let menuButtonInfo = {};
menuButtonInfo = uni.getMenuButtonBoundingClientRect();
import store from '../../store'
export default {
	props: {
		title: {
			type: String,
			default: ''
		},
		back: {
			type: Boolean,
			default: false
		},
		mode: {
			type: String,
			default: 'conter'
		},
		colorStr: {
			type: String,
			default: '#24231f'
		}
	},
	data() {
		return {
			menuButtonInfo
		}
	},
	onLoad() {
		console.log('title---', this.title)
	},
	methods: {
		onBack() {
			// this.$emit('onBack');
			const pages = getCurrentPages();
			if (pages.length <= 1) {
				uni.switchTab({
					url: '/pages/index/index'
				}); // 无历史则跳转首页 
			} else {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}

}
</script>

<style lang="scss" scoped>
.vtop {
	position: fixed;
	z-index: 999999;
	top: 0;
	left: 0;
	width: 100%;
	height: 30px;

	.title {
		margin: 0 auto;
		width: 55%;
		color: #24231f;
		font-size: 32rpx;
		line-height: 30px;
		// font-weight: bold;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.backj-img {
		padding: 14rpx 32rpx 14rpx 32rpx;
		position: absolute;
		z-index: 999999;
		top: 50%;
		transform: translateY(-50%);
		left: 32rpx;
		width: 32rpx;
		height: 32rpx;
		border-radius: 40rpx;
		background-color: rgba(255, 255, 255, 0.7);
		border: 1px solid rgba(0, 0, 0, 0.3);

		.img {
			width: 32rpx;
			height: 32rpx;
		}
	}
}
</style>