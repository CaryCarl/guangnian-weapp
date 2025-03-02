// import {
// 	fetch
// } from '../../utils/fetch.js';
export default {
	name: "my",
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
	watch: {},

	methods: {
		
		change() {
			console.log('dingyue---', this.dingyue);
		},
	}
}