let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
import {
	fetch
} from '../../utils/fetch.js';
import {
	getCodeLogin
} from '../../utils/login.js';
export default {
	data() {
		return {
			topRpx: '40px',
			menuButtonInfo,
			isLoading: false,
			scrollTop: '',
			swiperList: [],
			fileImg: '',
			homeHeader: [],
			homeHot: [],
			imageGroups: [],
			isShow: 1,
			featuredList: [],
			current: 0,
			flag: true,
			queryData: {
				pageNumber: 1,
				pageSize: 12,
				status: 1
			},
			resize: 15,
			hasMore: true,
			imageMogr2:"?imageMogr2/thumbnail/!20p"
		}
	},
	watch: {

	},
	async onLoad(options) {
		await this.$onLaunched;
		this.flag = true
		this.getFeatured()
		this.getImgList()
	},
	async onShow() {
		this.fileImg = this.$store.getters.getFileImg
		await this.$onLaunched;
	},
	onShareAppMessage() {
		let path = '/pages/index/index'
		return {
			title: '', // 默认为小程序名称
			path, // 默认为当前页面路径
			imageUrl: '', // 默认为当前页面的截图
		}
	},

	methods: {
		onTab(i) {
			this.current = i
		},
		// 获取推荐
		getFeatured() {
			let data = {
				featured: 1,
				status: 1
			}
			fetch(this.$api.getImageGroups, data, 'post').then((res) => {
				if (res?.data?.code === 200) {
					let temp = res?.data?.data || []
					try {
						temp.forEach(item => {
							item.cover_image = item.cover_image
						})
					} catch (error) {
						//TODO handle the exception
					}
					this.featuredList = temp
				} else {}
			}).catch(err => {
				console.log('err---', err);

			})
		},

		// 获取首页列表
		getImgList() {
			this.isLoading = true
			fetch(this.$api.getRandomImages, this.queryData, 'post').then((res) => {
				if (res?.data?.code === 200) {
					let temp = res?.data?.data || []
					if (temp && temp?.length > 0) {
						temp.forEach(item => {
							item.cover_image = item.url
						})
						this.imageGroups = [...this.imageGroups, ...temp]

						this.queryData.pageNumber++
						this.flag = true;
						this.isLoading = false
						this.hasMore = true

						uni.hideLoading();
					} else {
						this.hasMore = false
						this.flag = true;
						this.isLoading = false

						uni.hideLoading();
					}
				} else {
					this.hasMore = true
					this.isLoading = false

					uni.hideLoading();
				}
			}).catch(err => {
				console.log('err---', err);
				this.isLoading = false
				uni.showToast({
					title: '获取图片列表失败',
					icon: 'none'
				})
			})
		},
		
		
		onImg(item) {
			uni.navigateTo({
				url: `/pages/imgDetails/imgDetails?id=${item.id}&categoryId=${item.categoryId}&url=${item.url}`
			})
		},
		scrollTop() {
			console.log('scrollTop---');
		},
		// 监听滚动
		scroll(e) {
			let scrollTop = e.detail.scrollTop
			this.lastScrollTop = scrollTop
			let scrollHeight = e.detail.scrollHeight
			uni.createSelectorQuery().select('.home-main').boundingClientRect(data => {
				// 内容盒子滚动距离+内容盒子高度，是否大于内容盒子内滚动条在Y轴上的滚动距离
				let bottomHeight = scrollTop + data.height - 10 //误差px
				// console.log('bottomHeight---',this.page, this.isBottom, this.flag, bottomHeight, scrollHeight);

				if (bottomHeight >= scrollHeight && this.flag) {
					this.flag = false

					this.getImgList()

					console.log('111');
				}
			}).exec()
		},
	},

}