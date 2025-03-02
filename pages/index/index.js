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
			spinState: true,
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
			featuredList:[],
			current:0
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
	methods: {
		onTab(i) {
			console.log('i---', i);
			this.current = i
		},
		getFeatured() {
			let data = {
				featured:0,
				status:1
			}
			fetch(this.$api.getImageGroups, data, 'post').then((res) => {
				console.log('查询推荐--1-', res);
				if (res?.data?.code === 200) {
					let temp = res?.data?.data || []
					this.featuredList = temp
				}
			}).catch(err =>{
				console.log('err---', err);
			})
		},
		
		getImgList() {
			let data = {
				status:1
			}
			fetch(this.$api.getImageGroups, data, 'post').then((res) => {
				console.log('res--1-', res);
				if (res?.data?.code === 200) {
					let temp = res?.data?.data || []
					this.imageGroups = temp
				}
			}).catch(err =>{
				console.log('err---', err);
			})
		},
		onImg(item) {
			uni.navigateTo({
				url: '/pages/imgDetails/imgDetails?id=' + item.id
			})
		},
	},
	
	
	
}