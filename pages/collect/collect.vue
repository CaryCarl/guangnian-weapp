<template>
	<view class="collect-page">
		<Ball-Spin v-if="spinState"></Ball-Spin>
		<view class="grid-size qz-fl-sb-wrap" v-if="list.length > 0">
			<view class="jq-row mb32" v-for="(item, i) in list" :key="i" @click="onImg(item)">
				<image class="jq-img" mode="aspectFill" :src="item.url + '?imageMogr2/thumbnail/!30p'"></image>
			</view>
		</view>
		<view v-else class="" style="display: flex;justify-content: center;align-items: center;">
			<img src="@/static/img/data-no.png" style="width:35%;margin-top: 100rpx;" mode="widthFix"></img>
		</view>
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
			resize: 15
		};
	},



	async onLoad(options) {
		await this.$onLaunched;
		this.getList()
	},

	onShareAppMessage() {
		return {
			title: '', // 默认为小程序名称
			path: "", // 默认为当前页面路径
			imageUrl: '', // 默认为当前页面的截图
		}
	},

	methods: {
		getList() {
			this.spinState = true
			fetch(this.$api.getUserFavorites, {
				pageNumber: 1,
				pageSize: 100
			}, 'post').then((res) => {
				console.log('用户收藏---', res);
				if (res?.data?.code === 200) {
					let temp = res?.data?.data || []
					try {
						temp.forEach(item => {
							item.cover_image = item.cover_image
						})
					} catch (error) {
						//TODO handle the exception
					}

					this.list = temp
					this.spinState = false
				} else {
					this.spinState = false
				}

			}).catch(err => {
				this.spinState = false
			})
		},
		onImg(item) {
			uni.navigateTo({
				url: `/pages/imgDetails/imgDetails?id=${item.id}&categoryId=${item.categoryId}&url=${item.url}&tags_id=${item.tagsId}`
			})
		},
	}
}
</script>

<style lang="scss" scoped>
.collect-page {
	padding: 32rpx;
}

.grid-size {
	.jq-row {
		position: relative;
		width: calc(33.3% - 12rpx);
		height: 400rpx;
		border-radius: 12rpx;
		overflow: hidden;
		background-color: #ffffff;
		box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

		.jq-img {
			width: 100%;
			height: 100%;
			border-radius: 12rpx;
			object-fit: cover;
		}

	}
}
</style>