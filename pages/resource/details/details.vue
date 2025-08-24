<template>
	<view class="detail-page">
		<Header-Title :back="true" :title="detail.title" :colorStr="'#000000'"></Header-Title>

		<view class="detail-content" :style="{
			marginTop: `${menuButtonInfo.top + 40}px`,
			height: `calc(100% - ${menuButtonInfo.top + 35}px)`
		}">
			<view class="detail-title">
				{{ detail.title }}
			</view>

			<ad-custom unit-id="adunit-65cfe697de9d45ad" bindload="adLoad" binderror="adError"
				bindclose="adClose"></ad-custom>
			<!-- <rich-text :nodes="detail.content"></rich-text> -->
			<u-parse :content="detail.content" :tagStyle="style"></u-parse>

			<view class="detail-footer" @click="openBaiduPan">
				<image src="@/static/img/baidu.png" mode="widthFix" style="width: 32rpx; height: 32rpx;"></image>
				<view class="detail-footer-item-text">免费领取</view>
			</view>
			<view style="height: 150rpx;">
			</view>
		</view>

		<u-modal :show="show" confirmText="复制" :content='detail.baidu_pan_url' @confirm="copyUrl"></u-modal>

		<u-modal :show="showMsg" title="观看广告免费领取资源" showCancelButton="true" cancelText="取消" confirmText="立即观看"
			@cancel="showMsgcCncel" @confirm="showVideoAd">
			<view class="slot-content">
				{{ detail.title }}
			</view>
		</u-modal>

	</view>
</template>

<script>
let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
import {
	fetch
} from '../../../utils/fetch.js';
export default {
	data() {
		return {
			showMsg: false,
			id: '',
			detail: {
				title: '',
				content: ''
			},
			menuButtonInfo,
			topRpx: '40px',
			videoAd: null,
			show: false,
			style: {
				// 字符串的形式
				img: "border-radius: 12rpx;margin:16rpx 0 !important",
			},
		};
	},
	onLoad(options) {
		console.log('options', options);
		this.id = options.id;
		this.getDetail();
		this.catVideoAd()
	},
	onShareAppMessage() {
		let path = '/pages/resource/details/details?id=' + this.id
		return {
			title: "免费领取：" + this.detail.title, // 默认为小程序名称
			path, // 默认为当前页面路径
			imageUrl: '', // 默认为当前页面的截图
		}
	},
	methods: {
		showMsgcCncel() {
			this.showMsg = false
		},
		openBaiduPan() {
			console.log('openBaiduPan');
			this.showMsg = true
		},
		copyUrl() {
			let that = this
			uni.setClipboardData({
				data: that.detail.baidu_pan_url,
				success: () => {
					uni.showToast({
						title: '复制成功',
						icon: 'none'
					})
					that.show = false
				}
			})
		},

		catVideoAd() {
			if (wx.createRewardedVideoAd) {
				this.videoAd = wx.createRewardedVideoAd({
					adUnitId: 'adunit-eab2d7ee723a734c'
				})
				this.videoAd.onLoad(() => { })
				this.videoAd.onError((err) => {
					console.error('激励视频光告加载失败', err)
					if (err?.errCode === 1005) {
						this.showMsg = false
						this.show = true
					}
				})
				this.videoAd.onClose((res) => {
					console.log('关闭激励广告', res);
					if (res.isEnded) {
						this.showMsg = false
						this.show = true
					} else {
						this.show = false

						uni.showToast({
							title: '观看视频领取资源',
							icon: 'none',
							duration: 3000
						})
					}
				})
			}
		},
		showVideoAd(item) {
			if (this.videoAd) {
				this.videoAd.show().catch(() => {
					// 失败重试
					this.videoAd.load()
						.then(() => this.videoAd.show())
						.catch(err => {
							console.error('激励视频 广告显示失败', err)
						})
				})
			}
		},

		getDetail() {
			fetch(this.$api.getMaterialDetail, {
				id: this.id
			}, 'get').then((res) => {
				if (res?.data?.code === 200) {
					let detail = res.data.data;
					this.detail = detail;
					console.log('res', detail);
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.detail-page {
	padding: 0 32rpx;
	width: calc(100% - 64rpx);
	height: 100vh;
	background-color: #ffffff;
	overflow: hidden !important;
}

.detail-title {
	margin-bottom: 20rpx;
	font-size: 32rpx;
	font-weight: bold;
}

.detail-content {
	padding: 0 32rpx;
	padding-bottom: 100rpx !important;
	background-color: #ffffff;
	position: fixed;
	left: 0;
	z-index: 999;
	width: calc(100% - 64rpx);
	height: 100vh;
	overflow: auto;
	overflow-x: hidden;
	font-size: 28rpx;
}

.detail-footer {
	position: fixed;
	padding: 12rpx 8rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	top: 32%;
	right: 4rpx;
	width: 60rpx;
	border-radius: 12rpx;
	color: #ffffff;
	background: linear-gradient(90deg, #f59689 0%, #f05b47 100%) !important;

	.detail-footer-item-text {
		font-size: 24rpx;
		text-align: center;

		-webkit-animation: neon4 1.5s ease-in-out infinite alternate;
		-moz-animation: neon4 1.5s ease-in-out infinite alternate;
		animation: neon4 1.5s ease-in-out infinite alternate;
	}


	@-webkit-keyframes neon4 {
		from {
			text-shadow: 0 0 1px #fff,
				0 0 20px #fff,
				0 0 30px #fff,
				0 0 40px #B6FF00,
				0 0 70px #B6FF00,
				0 0 80px #B6FF00,
				0 0 100px #B6FF00,
				0 0 150px #B6FF00;
		}

		to {
			text-shadow: 0 0 5px #fff,
				0 0 10px #fff,
				0 0 15px #fff,
				0 0 20px #B6FF00,
				0 0 35px #B6FF00,
				0 0 40px #B6FF00,
				0 0 50px #B6FF00,
				0 0 75px #B6FF00;
		}
	}

}
</style>