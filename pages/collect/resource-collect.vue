<template>
	<view class="collect-page">
		<Ball-Spin v-if="spinState"></Ball-Spin>

		<view class="grid-container" v-if="list.length > 0">
			<view class="material-item" v-for="(item, index) in list" :key="item.id" @tap="onImg(item)">
				<view class="image-wrapper">
					<image class="main-img" :src="item.cover_image" mode="aspectFill" lazy-load></image>
					<view class="delete-btn" @tap.stop="handleDelete(item, index)">
						<image class="img" style="width: 42rpx; height: 42rpx;" src="@/static/img/shoucang-ac.png" />
					</view>
				</view>

				<view class="info-box">
					<text class="title">{{ item.title }}</text>
					<view class="meta">
						<text class="time">{{ formatDate(item.category_time) }}</text>
						<text class="tag" v-if="item.sub_category_id">ID:{{ item.material_id }}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="empty-status" v-if="list.length === 0 && !spinState">
			<image class="empty-img" src="/static/empty_collect.png" mode="aspectFit"></image>
			<text>暂无收藏资源</text>
		</view>

		<view class="footer-safe"></view>
	</view>
</template>

<script>
	import {
		fetch
	} from '../../utils/fetch.js';

	export default {
		data() {
			return {
				spinState: true,
				list: [],
			};
		},

		async onShow() {
			this.getList();
		},

		async onLoad(options) {
			// 确保小程序身份凭证加载完成
			if (this.$onLaunched) {
				await this.$onLaunched;
			}
			this.getList();
		},

		methods: {
			// 获取列表数据
			getList() {
				this.spinState = true;
				fetch(this.$api.getUserMaterialFavoriteList, {
					pageNumber: 1,
					pageSize: 100
				}, 'post').then((res) => {
					if (res?.data?.code === 200) {
						this.list = res.data?.data || [];
					}
				}).finally(() => {
					this.spinState = false;
				});
			},

			// 取消收藏逻辑
			handleDelete(item, index) {
				uni.showModal({
					title: '提示',
					content: '确定要取消收藏该素材吗？',
					confirmColor: '#fa436a',
					success: (res) => {
						if (res.confirm) {
							// 注意：这里调用的是你之前定义的删除接口，传的是素材的 id (或者 material_id，根据你后端逻辑定)

							fetch(this.$api.removeMaterialFavorite, {
								material_id: item.material_id,
							}, 'post').then((res) => {
								if (res?.data?.code === 200) {
									uni.showToast({
										title: '已取消收藏',
										icon: 'none'
									});
									this.list.splice(index, 1);
								} else {
									uni.showToast({
										title: delRes.data.msg || '操作失败',
										icon: 'none'
									});
								}
							}).catch(err => {})
						}
					}
				});
			},

			// 跳转详情
			onImg(item) {
				uni.navigateTo({
					url: `/pages/resource/details/details?id=${item.material_id}`
				})
			},

			// 格式化时间
			formatDate(dateStr) {
				if (!dateStr) return '';
				return dateStr.split(' ')[0];
			}
		}
	}
</script>

<style lang="scss" scoped>
	.collect-page {
		min-height: 100vh;
		background-color: #f8f8f8;
		padding: 24rpx;
	}

	.grid-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.material-item {
		width: 342rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
		margin-bottom: 24rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
		display: flex;
		flex-direction: column;
		position: relative;

		.image-wrapper {
			width: 100%;
			height: 300rpx; // 稍微长一点，视觉效果更好
			background-color: #f0f0f0;
			position: relative;

			.main-img {
				width: 100%;
				height: 100%;
				display: block;
			}

			// 右上角取消按钮样式
			.delete-btn {
				position: absolute;
				top: 12rpx;
				right: 12rpx;
				width: 56rpx;
				height: 56rpx;
				background-color: rgba(0, 0, 0, 0.3);
				backdrop-filter: blur(4px); // 毛玻璃效果
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				z-index: 10;

				&:active {
					transform: scale(0.9);
					background-color: rgba(0, 0, 0, 0.5);
				}
			}
		}

		.info-box {
			padding: 20rpx 16rpx;

			.title {
				font-size: 26rpx;
				color: #333;
				line-height: 1.5;
				height: 78rpx;
				font-weight: 500;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}

			.meta {
				margin-top: 16rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.time {
					font-size: 22rpx;
					color: #bbb;
				}

				.tag {
					font-size: 20rpx;
					color: #999;
					border: 1rpx solid #eee;
					padding: 0 8rpx;
					border-radius: 4rpx;
				}
			}
		}
	}

	.empty-status {
		padding-top: 300rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #999;
		font-size: 28rpx;

		.empty-img {
			width: 200rpx;
			height: 200rpx;
			margin-bottom: 20rpx;
			opacity: 0.6;
		}
	}

	.footer-safe {
		height: 50rpx;
	}
</style>