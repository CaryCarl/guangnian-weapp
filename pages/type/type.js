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

			imageList: [],
			tagId: null
		}
	},
	watch: {

	},
	async onLoad(options) {
		await this.$onLaunched;
		this.flag = true
		this.getImageType()
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
		getImagesByTag() {
			// *
			// * 请求参数:
			// * - tagId: 标签ID (必填)
			// * - page: 页码，默认为1
			// * - pageSize: 每页数量，默认为10
			// * - sortBy: 排序字段，默认为creation_time
			// * - sortOrder: 排序方式，asc或desc，默认为desc
			// */
			let data = {
				tagId: this.tagId,
				page: this.queryData.pageNumber,
				pageSize: this.queryData.pageSize
			}
			let list = []
			this.isLoading = true
			fetch(this.$api.getImagesByTag, data, 'get').then((res) => {
				console.log('图片列表---', res);
				if (res?.data?.code === 200) {
					list = res.data.data
					if (list?.length > 0) {

						this.queryData.pageNumber++
						this.imageList = [...this.imageList, ...list]
						this.flag = true;
						this.isLoading = false
					} else {
						this.flag = true;
						this.isLoading = false

					}
				}

			}).catch(err => {
				console.log('err---', err);
				this.flag = true;
				this.isLoading = false
			})
		},
		clickType(row) {
			let tagList = []
			this.tagsAll.forEach(item => {
				if (item.groupId === row.id) {
					tagList.push(item)
				}
			})
			console.log('row', row, tagList);
			this.typeTagList = tagList
			this.imageList = []
			if (tagList?.length > 0) {
				this.tagId = tagList[0].id
				this.queryData.pageNumber = 1
				this.getImagesByTag()
			}
		},
		clickTag(item) {
			this.tagId = item.id
			this.queryData.pageNumber = 1
			this.imageList = []
			this.getImagesByTag()
		},

		// 获取分类、所有标签
		getImageType() {
			let data = {
				featured: 1,
				status: 1,
			}
			fetch(this.$api.getImageType, data, 'get').then((res) => {
				let list = res?.data?.data || []
				this.typeList = list
				fetch(this.$api.getImageTags, 'get').then((res) => {
					let temp = res?.data?.data || []
					this.tagsAll = temp
					let tagList = []
					temp.forEach(item => {
						if (item.groupId === list[0].id) {
							tagList.push(item)
						}
					})
					console.log('图片标签-tagList--', tagList);
					this.typeTagList = tagList
					this.tagId = tagList[0].id
					this.getImagesByTag()
				}).catch(err => {
					console.log('err---', err);

				})

			}).catch(err => {
				console.log('err---', err);

			})
		},
		onImg(item) {
			console.log('item----', item);
			uni.navigateTo({
				url: `/pages/imgDetails/imgDetails?id=${item.id}&categoryId=${item.category_id}&url=${item.url}`
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
				let bottomHeight = scrollTop + data.height + 100 //误差px
				console.log('bottomHeight---', scrollTop, this.flag, bottomHeight, scrollHeight);
				if (bottomHeight >= scrollHeight && this.flag) {
					this.flag = false
					this.getImagesByTag()
				}
			}).exec()
		},
	},

}