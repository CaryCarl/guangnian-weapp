import {
	fetch
} from '../../utils/fetch.js';
export default {
	name: "my",
	data() {
		return {
		}
	},
	watch: {},

	methods: {
		
		change() {
			uni.navigateTo({
				url:"/pages/collect/collect"
			})
		},
	}
}