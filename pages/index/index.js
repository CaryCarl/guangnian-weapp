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
			topRpx: '35px',
			menuButtonInfo,
			isLoading: false,
			noMoreData: false,
			scrollTop: '',
			swiperList: [{
				imageUrl: 'https://qiezidj-resource.oss-cn-shenzhen.aliyuncs.com/images/d14b62a209f4440585e3f7442557331f.jpg',
				name: 'a',
				id: 1
			}],
			fileImg: '',
			homeHeader: [{
					imageUrl: 'https://qiezidj-resource.oss-cn-shenzhen.aliyuncs.com/jingqu/banner1.png'
				},
				{
					imageUrl: 'https://qiezidj-resource.oss-cn-shenzhen.aliyuncs.com/jingqu/banner2.png'
				},
				{
					imageUrl: 'https://qiezidj-resource.oss-cn-shenzhen.aliyuncs.com/jingqu/banner3.png'
				},
			],
			homeHot: [],
			imageGroups: [],
			isShow: 1,
			featuredList: [],
			current: 0,

			queryData: {
				pageNumber: 1,
				pageSize: 12,
				status: 1
			}
		}
	},
	watch: {

	},
	async onLoad(options) {
		await this.$onLaunched;
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

	onReachBottom() {
		console.log('滚动到底部时加载更多数据---');
		// 滚动到底部时加载更多数据
		if (!this.isLoading && !this.noMoreData) {
			this.getImgList()
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
					this.featuredList = temp
				} else {}
			}).catch(err => {
				this.noMoreData = true
				console.log('err---', err);

			})
		},

		// 获取首页列表
		getImgList() {
			if (this.isLoading || this.noMoreData) return
			let data = this.queryData

			this.isLoading = true
			fetch(this.$api.getImageGroups, data, 'post').then((res) => {
				if (res?.data?.code === 200) {
					let temp = res?.data?.data || []
					if (temp && temp?.length > 0) {
						this.imageGroups = [...this.imageGroups, ...temp]

						this.queryData.pageNumber++
						if (temp.length < this.queryData.pageSize) {
							this.noMoreData = true
						}

					} else {
						this.noMoreData = true
					}

					this.isLoading = false
				} else {
					this.isLoading = false
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
				url: '/pages/imgDetails/imgDetails?id=' + item.id
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
				let bottomHeight = scrollTop + data.height - 35 //误差px
				// console.log('bottomHeight---',this.page, this.isBottom, this.flag, bottomHeight, scrollHeight);

				if (bottomHeight >= scrollHeight) {
					console.log('111');
				}
			}).exec()
		},
	},



}