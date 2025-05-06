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