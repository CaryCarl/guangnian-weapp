import {
	fetch
} from '../../utils/fetch.js';
export default {
	name: "my",
	data() {
		return {
			mdList:[
				{
					v:"V1.0.10",
					value:["修复 分享入口进入首图加载路径转义"]
				},
				{
					v:"V1.0.9",
					value:["增加 图片详情页面分享好友功能","修复 图片下载问题"]
				}
			]
		}
	},
	watch: {},
	onShareAppMessage() {
		let path = '/pages/type/type'
		return {
			title: '这里有你喜欢的图片~', // 默认为小程序名称
			path, // 默认为当前页面路径
			imageUrl: '../../static/share.jpg', // 默认为当前页面的截图
		}
	},
	methods: {
		
		change() {
			uni.navigateTo({
				url:"/pages/collect/collect"
			})
		},
		
		changeMd() {
			uni.navigateTo({
				url:"/pages/my/about/about"
			})
		}
	}
}