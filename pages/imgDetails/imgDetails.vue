<template>
	<view class="img-page">
		<Header-Title :back="true" :title="current === 0?'':''"></Header-Title>
		<Ball-Spin v-if="spinState"></Ball-Spin>
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
			<view class="mt20 ">
				<img v-if="collected" @click="toggleCollect(false)" class="shoucang" src="/static/img/shoucang-ac.png" alt="" srcset="" />
				<img v-else @click="toggleCollect(true)" class="shoucang" src="/static/img/shoucang.png" alt="" srcset="" />
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
				collected:false,
				spinState: true
			};
		},
		onLoad(options) {
			this.id = options?.id || 1
			this.isCollect()
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
			onBack() {
				
			},
			// 查询分组是否被收藏
			isCollect() {
				fetch(this.$api.checkCollection, {
					group_id: Number(this.id)
				}, 'post').then((res) => {
					if(res?.data?.code === 200) {
						this.collected = res?.data?.data.collected
						
						console.log('是否收藏', this.collected);
					}
				
				})
			},
			toggleCollect(state) {
				console.log('state---', state);
				
				
				fetch(this.$api.toggleCollect, {
					group_id: Number(this.id)
				}, 'post').then((res) => {
					console.log('收藏操作', res);
					if(res?.data?.code === 200) {
						this.collected =  res?.data?.data
					}
				})
				
			},
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
				this.spinState = true
				fetch(this.$api.getImageGroups, {
					id
				}, 'post').then((res) => {
					if (res.data.code === 200) {
						let temp = res.data?.data[0]?.images_url || []
						this.imageList = temp
						this.spinState = false
					}else {
						this.spinState = false
					}

				}).catch(err =>{
					this.spinState = false
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './imgDetails.scss';
</style>