<template>
	<view class="img-page">
		<swiper v-if="imageList.length > 0" class="swiper" :indicator-dots="false" :autoplay="false" :circular="false"
			@change="onSwiperChange">
			<swiper-item v-for="(item, i) in imageList" :key="i">
				<image class="swiper-image" :src="item" mode="aspectFill" />
			</swiper-item>
		</swiper>

		<!-- 当前图片索引 -->
		<view class="indicator">
			{{ currentIndex + 1 }} / {{ imageList.length }}
		</view>

		<view class="operate">
			<img @click="downloadImage" class="xiazai" src="/static/img/xiazai.png" alt="" srcset="" />
			<view class="mt20">
				收藏
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
			};
		},
		onLoad(options) {
			console.log('options---', options);
			this.id = options?.id || 1
			this.getImgList(options?.id)
		},
		// onShareAppMessage() {
		// 	return {
		// 		title: '123',
		// 		path: `pages/index/index`,
		// 		imageUrl: this.imageList[0],
		// 	}
		// },
		methods: {
			downloadImage() {
				wx.showLoading({
					title: '图片下载中',
					mask: true
				})
				const imageList = []
				let urls = this.imageList
				// 循环数组
				for (let i = 0; i < urls.length; i++) {
					imageList.push(this.getTempPath(urls[i]))
				}
				const loadTask = []
				let index = 0
				while (index < imageList.length) {
					loadTask.push(
						new Promise((resolve, reject) => {
							// 将数据分割成多个promise数组
							Promise.all(imageList.slice(index, (index += 8)))
								.then(res => {
									resolve(res)
								})
								.catch(err => {
									reject(err)
								})
						})
					)
				}
				// Promise.all 所有图片下载完成后弹出
				Promise.all(loadTask)
					.then(res => {
						wx.showToast({
							title: '下载完成',
							duration: 3000
						})
					})
					.catch(err => {
						wx.showToast({
							title: `下载完成`,
							icon: 'none',
							duration: 3000
						})
					})
			},
			getTempPath(url) {
				return new Promise((resolve, reject) => {
					wx.downloadFile({
						url: url,
						success: function(res) {
							var temp = res.tempFilePath
							wx.saveImageToPhotosAlbum({
								filePath: temp,
								success(res) {
									return resolve(res)
								},
								fail: function(err) {
									reject(url + JSON.stringify(err))
								}
							})
						},
						fail: function(err) {
							reject(url + JSON.stringify(err))
						}
					})
				})
			},
			handleSaveError(err) {
				if (err.errMsg.includes('auth')) {
					wx.showModal({
						title: '需要相册权限',
						content: '请前往设置开启相册权限',
						success: (res) => res.confirm && wx.openSetting()
					})
				}
			},

			handleDownloadError(err) {
				wx.showToast({
					title: `下载失败：${err.errMsg}`,
					icon: 'none'
				})
			},
			onSwiperChange(event) {
				this.currentIndex = event.detail.current;
			},
			getImgList(id) {
				fetch(this.$api.getImageGroups, {
					id
				}, 'post').then((res) => {
					if (res.data.code === 200) {
						let temp = res.data?.data[0]?.images_url || []

						this.imageList = temp

						console.log('res--1-', this.imageList);
					}

				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './imgDetails.scss';
</style>