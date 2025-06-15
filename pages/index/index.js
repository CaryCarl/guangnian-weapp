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
			imageMogr2: "?imageMogr2/thumbnail/!20p",

			sharedImageInfo: null
		}
	},
	watch: {

	},
	async onLoad(options) {
		await this.$onLaunched;
		this.flag = true
		this.getFeatured()
		this.getImgList()

		if (wx.canIUse('skyline')) {
			console.log('当前环境支持Skyline引擎');
		} else {
			console.log('当前环境不支持Skyline引擎，动画效果可能受限');
		}
	},
	async onShow() {
		this.fileImg = this.$store.getters.getFileImg
		await this.$onLaunched;
	},
	onShareAppMessage() {
		let path = '/pages/index/index'
		return {
			title: '海量高清手机壁纸，美女帅哥图库，头像、表情包', // 默认为小程序名称
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


		onImg(item, index) {
			console.log('item---', item);
			// 导航到详情页
			uni.navigateTo({
				// url: `/pages/detail/detail?id=2&index=${2}`,
				url: `/pages/imgDetails/imgDetails?id=${item.id}&categoryId=${item.categoryId}&url=${item.url}&tags_id=${item.tagsId}`,
				// animationType: 'none' // 禁用默认动画，使用自定义动画getImgList
			});
			// 获取当前图片元素的位置和大小信息
			// const query = uni.createSelectorQuery();
			// console.log('query---', query);
			// query.select(`#image-${index}`).boundingClientRect(rect => {
			// 	if (!rect) return;

			// 	// 保存图片信息到全局状态
			// 	getApp().globalData = getApp().globalData || {};
			// 	getApp().globalData.sharedImageInfo = {
			// 		id: item.id,
			// 		rect: {
			// 			width: rect.width,
			// 			height: rect.height,
			// 			left: rect.left,
			// 			top: rect.top
			// 		},
			// 		url: item.url
			// 	};

			// 	// 导航到详情页
			// 	uni.navigateTo({
			// 		// url: `/pages/detail/detail?id=2&index=${2}`,
			// 		url: `/pages/imgDetails/imgDetails?id=${item.id}&categoryId=${item.categoryId}&url=${item.url}&tags_id=${item.tags_id}`,
			// 		// animationType: 'none' // 禁用默认动画，使用自定义动画getImgList
			// 	});
			// }).exec();
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