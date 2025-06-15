<template>
	<view class="img-page">
		<Header-Title :back="true" :title="current === 0 ? '' : ''"></Header-Title>
		<Ball-Spin v-if="spinState"></Ball-Spin>
		<swiper v-if="imageList.length > 0" class="swiper" :indicator-dots="false" :autoplay="false" :circular="false"
			@change="onSwiperChange">
			<swiper-item v-for="(item, i) in imageList" :key="i">
				<image v-if="item.is_webp == 1" class="swiper-image" :src="item.url + '?imageMogr2/format/webp'"
					mode="aspectFill" />
				<image v-else class="swiper-image" :src="item.url" mode="aspectFill" />
			</swiper-item>
		</swiper>

		<!-- 当前图片索引 -->
		<view class="indicator">
			{{ currentIndex + 1 }} / {{ imageList.length + 20 }}
		</view>

		<view class="operate" v-if="imageList.length > 0">
			<img @click="download" class="xiazai" src="/static/img/xiazai.png" alt="" srcset="" />
			<view class="mt20 ">
				<img v-if="imageList[currentIndex].collected" @click="toggleCollect(false)" class="shoucang"
					src="/static/img/shoucang-ac.png" alt="" srcset="" />
				<img v-else @click="toggleCollect(true)" class="shoucang" src="/static/img/shoucang.png" alt=""
					srcset="" />
			</view>
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
			id: null,
			imageList: [],
			currentIndex: 0,
			collected: false,
			spinState: true,
			categoryId: "",
			tagId: "",
			firstImage: "",
			previousImageId: null
		};
	},
	onLoad(op) {
		console.log('op', op);
		let id = Number(op?.id) || 1
		this.id = id
		this.tagId = op.tags_id.split(',')[0]
		this.categoryId = op.categoryId
		this.firstImage = op.url

		this.imageList = [{
			id: id,
			url: op.url,
			collected: null,
			categoryId: op.categoryId,
			isWebp: 1
		}]
		// this.getImgList(2)
		this.getPreviousImage()

	},
	onShareAppMessage() {
		const currentImage = this.imageList[this.currentIndex];
		// let path = `pages/imgDetails/imgDetails?id=${currentImage.id}&url=${encodeURIComponent(currentImage.url)}&categoryId=${this.categoryId}`
		let path = `pages/imgDetails/imgDetails?id=${currentImage.id}&url=${currentImage.url}&categoryId=${this.categoryId}&tags_id=${this.tagId}`
		return {
			title: '分享一张精美图片给你~',
			path,
			imageUrl: currentImage.url,
		}
	},
	methods: {
		getPreviousImage() {
			this.spinState = true
			fetch(this.$api.getPreviousImage, {
				imageId: this.id,
				categoryId: this.categoryId,
				tagId: this.tagId
			}, 'get').then((res) => {
				if (res.data.code === 200 && res.data?.data) {
					let temp = res.data.data;
					this.spinState = false

					if (temp && temp.id && temp.url) {
						this.id = temp.id;
						let active = {
							id: temp.id,
							url: temp.url,
							collected: null,
							categoryId: temp.category_id || '',
							isWebp: temp.is_webp || 0
						};
						this.imageList = [...this.imageList, active];
					} else {
						console.error('Invalid image data received:', temp);
						wx.showToast({
							title: '获取图片数据失败',
							icon: 'none'
						});
					}
				} else {
					this.spinState = false

					console.error('Failed to get previous image:', res);
					wx.showToast({
						title: '获取图片失败',
						icon: 'none'
					});
				}
			}).catch(err => {
				this.spinState = false

				console.error('Error fetching previous image:', err);
				wx.showToast({
					title: '获取图片出错',
					icon: 'none'
				});
			});
		},
		onBack() {

		},
		// 查询分组是否被收藏
		isCollect(image_id, index) {
			fetch(this.$api.checkImageFavorite, {
				image_id: image_id
			}, 'post').then((res) => {
				if (res?.data?.code === 200) {
					let collected = res?.data?.data.collected || false
					this.imageList[index].collected = collected
				}

			})
		},
		// 添加/取消收藏
		toggleCollect(state) {
			let info = this.imageList[this.currentIndex]
			if (info.collected) {
				// 取消收藏
				fetch(this.$api.removeFavorite, {
					image_id: info.id
				}, 'post').then((res) => {
					if (res?.data?.code === 200) {
						this.imageList[this.currentIndex].collected = res?.data?.data?.collected
					} else {
						wx.showToast({
							title: `取消收藏失败`,
							icon: 'none'
						})
					}
				})

			} else {
				// 添加收藏
				fetch(this.$api.addFavorite, {
					image_id: info.id
				}, 'post').then((res) => {
					if (res?.data?.code === 200) {
						this.imageList[this.currentIndex].collected = res?.data?.data?.collected
					} else {
						wx.showToast({
							title: `收藏失败`,
							icon: 'none'
						})
					}
				})

			}

		},
		download() {
			wx.showLoading({
				title: '图片下载中...',
				mask: true // 添加蒙层防止用户触摸操作
			})
			wx.downloadFile({
				url: this.imageList[this.currentIndex].url,
				success: function (res) {
					// 下载成功后的临时路径
					if (res.statusCode === 200) {
						// 保存图片到相册
						wx.hideLoading()
						wx.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function () {
								wx.showToast({
									title: '保存成功',
									icon: 'success'
								})
							},
							fail: function (err) {
								console.error('保存失败', err)
								wx.showToast({
									title: '保存失败',
									icon: 'none'
								})
							}
						})
					}
				},
				fail: function (err) {
					console.error('下载失败', err)
					wx.hideLoading()
					wx.showToast({
						title: '下载失败',
						icon: 'none'
					})
				}
			})
		},

		onSwiperChange(event) {
			let current = event.detail.current;
			this.currentIndex = current
			if (this.imageList[current].collected === null) {
				this.isCollect(this.imageList[current].id, current)
			}
			this.id = this.imageList[current].id
			if (this.imageList[current].id === this.imageList[this.imageList.length - 1].id) {
				this.getPreviousImage()
			}
		},
		getImgList(pageSize) {
			this.spinState = true
			fetch(this.$api.getRandomImages, {
				category_id: this.categoryId,
				pageNumber: 1,
				pageSize,
				status: 1
			}, 'post').then((res) => {
				if (res.data.code === 200) {
					let temp = res.data?.data
					temp.forEach(item => {
						item.collected = null
					})
					this.imageList = [...this.imageList, ...temp]
					this.isCollect(this.imageList[0].id, 0)
					setTimeout(() => {
						this.spinState = false
					}, 1000)
				} else {
					this.spinState = false
				}

			}).catch(err => {
				this.spinState = false
			})
		},
	}
}
</script>

<style lang="scss" scoped>
@import './imgDetails.scss';
</style>