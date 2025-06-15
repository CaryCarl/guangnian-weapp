<template>
	<view class="detail-container">
		<!-- 过渡动画容器 -->
		<view class="transition-container" :style="transitionStyle">
			<image :src="imageDetail.url" mode="aspectFill" class="hero-image" :style="imageStyle"
				@load="onImageLoad" />
		</view>

		<!-- 详情内容 -->
		<view class="content" :class="{ 'content-visible': contentVisible }">
			<view class="title">{{ imageDetail.title }}</view>
			<view class="description">{{ imageDetail.description }}</view>

			<view class="actions">
				<button class="action-btn like-btn">
					<text class="icon">❤️</text> 喜欢
				</button>
				<button class="action-btn share-btn">
					<text class="icon">🔗</text> 分享
				</button>
				<button class="action-btn save-btn">
					<text class="icon">💾</text> 保存
				</button>
			</view>

			<view class="related-title">相关推荐</view>
			<scroll-view scroll-x class="related-images">
				<view v-for="(item, index) in relatedImages" :key="index" class="related-item">
					<image :src="item.url" mode="aspectFill" class="related-thumbnail" />
					<text class="related-name">{{ item.title }}</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// import uni from '@dcloudio/uni-app';

	export default {
		data() {
			return {
				id: null,
				index: 0,
				imageDetail: {},
				sharedImageInfo: null,
				transitionStyle: {},
				imageStyle: {},
				contentVisible: false,
				relatedImages: [{
						url: 'https://juzi-1253562145.cos.ap-guangzhou.myqcloud.com/dajuzi/xiantiaodog/1743943173390_820d2e6f1b979d86.jpg?imageMogr2/thumbnail/!20p',
						title: '相关图片1'
					},
					{
						url: 'https://juzi-1253562145.cos.ap-guangzhou.myqcloud.com/dajuzi/xiantiaodog/1743943173390_820d2e6f1b979d86.jpg?imageMogr2/thumbnail/!20p',
						title: '相关图片2'
					},
					{
						url: 'https://juzi-1253562145.cos.ap-guangzhou.myqcloud.com/dajuzi/xiantiaodog/1743943173390_820d2e6f1b979d86.jpg?imageMogr2/thumbnail/!20p',
						title: '相关图片3'
					},
					{
						url: 'https://juzi-1253562145.cos.ap-guangzhou.myqcloud.com/dajuzi/xiantiaodog/1743943173390_820d2e6f1b979d86.jpg?imageMogr2/thumbnail/!20p',
						title: '相关图片4'
					}
				],
				// 动画相关参数
				animationDuration: 300, // 动画持续时间(毫秒)
				animationTiming: 'cubic-bezier(0.33, 0.66, 0.66, 1)', // 缓动函数
				animation: null
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.index = options.index || 0;

			// 从全局获取共享元素信息
			const app = getApp();
			if (app.globalData && app.globalData.sharedImageInfo) {
				this.sharedImageInfo = app.globalData.sharedImageInfo;

				// 设置初始样式，与首页图片位置大小一致
				this.setInitialStyles();

				// 获取图片详情
				this.getImageDetail();

				// 延迟一帧执行动画
				setTimeout(() => {
					this.startAnimation();
				}, 50);
			} else {
				// 如果没有共享元素信息，直接显示内容
				this.getImageDetail();
				this.contentVisible = true;
			}
		},
		methods: {
			getImageDetail() {
				// 模拟从数据源获取详情
				// 实际应用中可能是从服务器获取
				const imageList = [{
						id: 1,
						url: 'https://juzi-1253562145.cos.ap-guangzhou.myqcloud.com/dajuzi/xiantiaodog/1743943173390_820d2e6f1b979d86.jpg?imageMogr2/thumbnail/!20p',
						title: '风景图片一',
						description: '这是一张美丽的风景照片，拍摄于山间的清晨，雾气缭绕，阳光透过云层洒在山谷中。这里的空气清新，鸟儿在林间歌唱，溪水潺潺流过山谷，形成了一幅如诗如画的自然景观。每年都有许多摄影爱好者来到这里，捕捉这美丽的瞬间。'
					},
					{
						id: 2,
						url: 'https://juzi-1253562145.cos.ap-guangzhou.myqcloud.com/dajuzi/xiantiaodog/1743943173390_820d2e6f1b979d86.jpg?imageMogr2/thumbnail/!20p',
						title: '风景图片二',
						description: '这是一张海边的照片，蓝天白云下，海浪轻轻拍打着金色的沙滩，远处有几艘小船在海面上漂浮。海鸥在天空中盘旋，偶尔俯冲到海面捕捉食物。沙滩上留下了游客的脚印，海风带着咸咸的味道，让人感到无比放松和惬意。'
					},
					{
						id: 3,
						url: 'https://juzi-1253562145.cos.ap-guangzhou.myqcloud.com/dajuzi/xiantiaodog/1743943173390_820d2e6f1b979d86.jpg?imageMogr2/thumbnail/!20p',
						title: '风景图片三',
						description: '这是一张城市夜景，霓虹灯闪烁，高楼大厦的灯光映照在河面上，形成了美丽的倒影。城市的夜晚充满活力，街道上人来人往，各种声音交织在一起，形成了独特的城市交响曲。远处的摩天轮缓缓转动，为夜空增添了一抹绚丽的色彩。'
					},
					{
						id: 4,
						url: 'https://juzi-1253562145.cos.ap-guangzhou.myqcloud.com/dajuzi/xiantiaodog/1743943173390_820d2e6f1b979d86.jpg?imageMogr2/thumbnail/!20p',
						title: '风景图片四',
						description: '这是一张森林深处的照片，阳光透过树叶间的缝隙，在地面上形成斑驳的光影。古老的树木高耸入云，地面上铺满了厚厚的落叶，踩上去软软的，发出沙沙的声音。空气中弥漫着泥土和植物的芳香，让人仿佛回到了原始的自然状态。'
					}
				];

				this.imageDetail = imageList.find(item => item.id == this.id) || {};
			},
			setInitialStyles() {
				if (!this.sharedImageInfo) return;

				const {
					rect,
					url
				} = this.sharedImageInfo;
				const windowWidth = uni.getSystemInfoSync().windowWidth;
				const windowHeight = uni.getSystemInfoSync().windowHeight;

				// 计算缩放比例和位置
				const scaleX = rect.width / windowWidth;
				const scaleY = rect.height / (windowHeight * 0.6); // 假设详情页图片高度为屏幕高度的60%

				// 设置初始样式
				this.transitionStyle = {
					position: 'absolute',
					left: `${rect.left}px`,
					top: `${rect.top}px`,
					width: `${rect.width}px`,
					height: `${rect.height}px`,
					zIndex: 100,
					overflow: 'hidden',
					borderRadius: '12rpx',
					transition: 'none'
				};

				this.imageStyle = {
					width: '100%',
					height: '100%',
					objectFit: 'cover'
				};
			},
			startAnimation() {
				const windowWidth = uni.getSystemInfoSync().windowWidth;
				const windowHeight = uni.getSystemInfoSync().windowHeight;

				// 使用更高级的过渡效果
				this.transitionStyle = {
					...this.transitionStyle,
					left: '0px',
					top: '0px',
					width: `${windowWidth}px`,
					height: `${windowHeight * 0.6}px`,
					borderRadius: '0',
					// 添加更多属性的过渡，如阴影、模糊等
					boxShadow: '0 10rpx 30rpx rgba(0, 0, 0, 0.2)',
					transition: `all ${this.animationDuration}ms ${this.animationTiming}`
				};

				// 同时为图片添加过渡效果
				this.imageStyle = {
					...this.imageStyle,
					filter: 'brightness(1.05)',
					transition: `all ${this.animationDuration}ms ${this.animationTiming}`
				};



				// const windowWidth = uni.getSystemInfoSync().windowWidth;
				// const windowHeight = uni.getSystemInfoSync().windowHeight;

				// // 创建动画实例
				// this.animation = uni.createAnimation({
				// 	duration: this.animationDuration,
				// 	timingFunction: this.animationTiming,
				// 	delay: 0
				// });

				// // 设置动画
				// this.animation.width(windowWidth).height(windowHeight * 0.6)
				// 	.left(0).top(0).borderRadius(0)
				// 	.step();

				// // 应用动画
				// this.transitionStyle = {
				// 	...this.transitionStyle,
				// 	transition: 'none' // 禁用CSS过渡，使用Animation API
				// };

				// // 更新视图
				// this.$nextTick(() => {
				// 	this.transitionStyle = {
				// 		...this.transitionStyle,
				// 		...this.animation.export()
				// 	};

				// 	// 动画结束后显示内容
				// 	setTimeout(() => {
				// 		this.contentVisible = true;
				// 	}, this.animationDuration);
				// });
			},
			onImageLoad() {
				// 图片加载完成后，如果没有执行过动画，则执行
				if (!this.contentVisible && !this.sharedImageInfo) {
					this.contentVisible = true;
				}
			}
		},
		// 页面卸载时清理全局状态
		onUnload() {
			const app = getApp();
			if (app.globalData) {
				app.globalData.sharedImageInfo = null;
			}
		}
	}
</script>

<style>
	.detail-container {
		position: relative;
		width: 100%;
		height: 100vh;
		background-color: #fff;
	}

	.transition-container {
		will-change: transform, width, height, left, top;
		transform: translateZ(0);
		border: 2px solid red;
	}

	.hero-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.content {
		position: relative;
		padding: 30rpx;
		opacity: 0;
		transform: translateY(30rpx);
		transition: all 0.3s ease-out 0.2s;
	}

	.content-visible {
		opacity: 1;
		transform: translateY(0);
	}

	.title {
		font-size: 40rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
		color: #333;
	}

	.description {
		font-size: 28rpx;
		line-height: 1.6;
		color: #666;
		margin-bottom: 30rpx;
	}

	.actions {
		display: flex;
		justify-content: space-around;
		margin: 40rpx 0;
	}

	.action-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: none;
		border: none;
		padding: 0;
		font-size: 24rpx;
		color: #333;
	}

	.action-btn::after {
		border: none;
	}

	.icon {
		font-size: 40rpx;
		margin-bottom: 10rpx;
	}

	.related-title {
		font-size: 32rpx;
		font-weight: bold;
		margin: 30rpx 0 20rpx;
		color: #333;
	}

	.related-images {
		white-space: nowrap;
		margin: 0 -30rpx;
		padding: 0 30rpx;
	}

	.related-item {
		display: inline-block;
		width: 200rpx;
		margin-right: 20rpx;
	}

	.related-thumbnail {
		width: 200rpx;
		height: 150rpx;
		border-radius: 8rpx;
	}

	.related-name {
		font-size: 24rpx;
		color: #666;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: block;
		margin-top: 10rpx;
	}
</style>