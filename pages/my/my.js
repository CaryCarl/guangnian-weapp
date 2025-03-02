import {
	fetch
} from '../../utils/fetch.js';
export default {
	data() {
		return {
			followList: [],
			page: 1,
			videoList: [],
			screencapState: false,
			spinState: true,
			fileImg: '',
			dingyue: false
		}
	},
	watch: {

	},

	async onShow() {
		await this.$onLaunched;
	},


	methods: {
		onShare() {
			// 触发分享
			uni.share({
				provider: 'weixin',
				type: 'message',
				title: '分享标题',
				summary: '分享的内容',
				href: 'https://example.com', // 分享链接
				imageUrl: 'https://example.com/image.png', // 分享的图片
				success: function() {
					console.log('分享成功');
				},
				fail: function(err) {
					console.error('分享失败', err);
				}
			});
		},
		feedback() {
			uni.navigateTo({
				url: '/pages/feedback/feedback'
			})
		},
		onList(item) {
			uni.navigateTo({
				url: '/pages/my/myPhoto/myPhoto'
			})
		},
		change() {
			console.log('dingyue---', this.dingyue);
		},
	}
}