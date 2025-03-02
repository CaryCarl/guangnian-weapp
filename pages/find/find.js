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
                spinState:true,
                fileImg:'',
				list:[]
			}
		},
		watch: {
			
		},
        
		async onShow() {
            await this.$onLaunched;
			this.getDiscover()
		},
		

		methods: {
			getDiscover() {
				fetch(this.$api.discover, {}, 'get').then((res) => {
					let temp = res[1]?.data?.data || []
					// temp[0].image = 'https://qiezidj-resource.oss-cn-shenzhen.aliyuncs.com/zhengjianzhao/dise.png'
					temp[0].image = 'https://qiezidj-resource.oss-cn-shenzhen.aliyuncs.com/zhengjianzhao/kb.png'
					this.list = temp
					console.log('发现列表---', temp);
				})
				
			},
			onCard(item,i) {
				console.log(item,i);
				uni.navigateTo({
					url: item.toPath
				})
			}
		}
	}