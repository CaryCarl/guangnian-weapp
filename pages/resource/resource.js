let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
import {
	fetch
} from '../../utils/fetch.js';
export default {
	data() {
		return {
			topRpx: '30px',
			menuButtonInfo,
			isLoading: false,
			scrollTop: '',
			swiperList: [{
				imageUrl: 'https://qiezidj-resource.oss-cn-shenzhen.aliyuncs.com/images/d14b62a209f4440585e3f7442557331f.jpg',
				name: 'a',
				id: 1
			}],
			fileImg: '',
			homeHot: [],
			imageGroups: [],
			isShow: 1,
			featuredList: [],
			flag: true,
			queryData: {
				pageNumber: 1,
				pageSize: 12,
				status: 1
			},
			resize: 15,
			hasMore: true,
			typeList: [],
			tagsAll: [],
			typeTagList: [],

			resourceList: [],
			tagId: null,
			indexList: [],
			urls: [
				"https://uviewui.com/album/1.jpg",
				"https://uviewui.com/album/2.jpg",
				"https://uviewui.com/album/3.jpg",
				"https://uviewui.com/album/4.jpg",
				"https://uviewui.com/album/5.jpg",
				"https://uviewui.com/album/6.jpg",
				"https://uviewui.com/album/7.jpg",
				"https://uviewui.com/album/8.jpg",
				"https://uviewui.com/album/9.jpg",
				"https://uviewui.com/album/10.jpg",
			],
			pageNumber: 1,
			interstitialAd: null,
			videoAd: null,
			baidu_pan_url:"",
			zyTitle:"",
			show:false,
			typeId: null
		}
	},
	watch: {

	},
	async onLoad(options) {
		await this.$onLaunched;
		this.getCategoryList()
		this.catVideoAd()
		if (wx.createInterstitialAd) {
			this.interstitialAd = wx.createInterstitialAd({
				adUnitId: 'adunit-d345258e4e808ce1'
			})
			this.interstitialAd.onLoad(() => { })
			this.interstitialAd.onError((err) => {
				console.error('插屏广告加载失败', err)
			})
			this.interstitialAd.onClose(() => { })
		}

		setTimeout(() => {
			if (this.interstitialAd) {
				this.interstitialAd.show().catch((err) => {
					console.error('插屏广告显示失败', err)
				})
			}
		}, 2000);


	},
	async onShow() {
		this.fileImg = this.$store.getters.getFileImg
		await this.$onLaunched;
	},
	onShareAppMessage() {
		let path = '/pages/type/type'
		return {
			title: '免费领取更多资源~', // 默认为小程序名称
			path, // 默认为当前页面路径
			imageUrl: '', // 默认为当前页面的截图
		}
	},

	methods: {
		copyUrl(){
			let that = this
			uni.setClipboardData({
				data: that.baidu_pan_url,
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
				})
				this.videoAd.onClose((res) => { 
					console.log('关闭激励广告', res);
					if(res.isEnded){
						this.show = true
					}else {
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
			console.log('item', item);
			this.baidu_pan_url = item.baidu_pan_url
			this.zyTitle = item.title
			this.show = true
			return
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
		scrolltolower() {
			if (this.flag) {
				this.getResourceList();
			}
		},
		goDetail(item) {
			console.log('item', item);
			uni.navigateTo({
				url: `/pages/resource/details/details?id=${item.id}`
			})
		},
		getResourceList() {
			let temp = this.tagsAll.find(item => item.id === this.tagId)

			let data = {
				pageNumber: this.pageNumber,
				pageSize: 10,
				status: 1,
				sub_category_id: temp.id,
				sort: 'sort_time'
			}
			this.isLoading = true
			fetch(this.$api.getMaterialList, data, 'get').then((res) => {
				let list = []
				if (res?.data?.code === 200) {
					list = res.data.data
					console.log('list-资料-2-', list);
					if (list?.length === 10) {
						this.flag = true
						this.pageNumber++
					} else {
						this.flag = false
						this.pageNumber--
					}

					if (list?.length > 0) {
						this.queryData.pageNumber++
						this.resourceList = [...this.resourceList, ...list]
						this.isLoading = false
					} else {
						this.isLoading = false
					}
				}

			}).catch(err => {
				this.isLoading = false
			})
		},
		clickType(row) {
			let tagList = []
			this.typeId = row.id
			this.tagsAll.forEach(item => {
				if (item.category_id === row.id) {
					tagList.push(item)
				}
			})
			console.log('row', row, tagList);
			this.typeTagList = tagList
			this.resourceList = []
			if (tagList?.length > 0) {
				this.tagId = tagList[0].id
				this.pageNumber = 1
				this.getResourceList()
			}
		},
		clickTag(item) {
			console.log('item', item);
			this.tagId = item.id
			this.pageNumber = 1
			this.resourceList = []
			this.getResourceList()
		},

		// 获取分类、所有标签
		getCategoryList() {
			let params = {
				pageSize: 50,
				pageNumber: 1,
				status: 1
			}
			fetch(this.$api.getCategoryList, params, 'get').then((res) => {
				if (res?.data?.code === 200) {
					let categoryList = res?.data?.data || []
					this.typeList = categoryList
					this.typeId = categoryList[0].id


					fetch(this.$api.getSubcategoryList, 'get').then((resSub) => {
						if (resSub?.data?.code === 200) {
							let subcategoryList = resSub?.data?.data || []
							let tagList = []

							subcategoryList.forEach(item => {
								if (item.category_id === categoryList[0].id && item.status ===
									1) {
									tagList.push(item)
								}
							})
							this.tagsAll = subcategoryList
							this.typeTagList = tagList
							this.tagId = tagList[0].id

							this.getResourceList()
						}
					}).catch(err => {
						console.log('err---', err);
					})
				}
			}).catch(err => {
				console.log('err---', err);
			})
		},
		onImg(item) {
			console.log('item---', item);
			uni.navigateTo({
				url: `/pages/imgDetails/imgDetails?id=${item.id}&categoryId=${item.category_id}&url=${item.url}&tags_id=${item.tags_id}`
			})
		},
		scrollTop() {
			console.log('scrollTop---');
		},
	},

}