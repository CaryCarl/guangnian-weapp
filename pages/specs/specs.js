import {
	fetch
} from '../../utils/fetch.js';
export default {
	data() {
		return {
			keyword: '',
			tabId: -1,
			groupList: [],
			groupId: 0
		}
	},
	watch: {

	},

	async onShow() {
		await this.$onLaunched;
		this.getSize()
	},

	methods: {
		onSize(item,i) {
			uni.navigateTo({
				url: '/pages/make/make?sizeId=' + item.sizeId
			})
		},
		onTab(item, i) {
			this.tabId = item.id
			this.groupId = i
		},
		closeInput() {
			this.keyword = ''
		},
		getSize() {
			let temp = this.$store.getters.getSizeList
			const transformedData = this.transformData(temp);
			let groupList = transformedData
			// 提取并汇总 list 数组
			const allSize = {
				sizeGroupTitle: '全部',
				id: -1,
				list: this.extractList(transformedData)
			}
			groupList.unshift(allSize);
			this.groupList = groupList
		},
		transformData(rows) {
			const result = [];

			rows.forEach((item, i) => {
				// 查找当前 sizeGroup 是否已经存在于结果中
				let group = result.find(g => g.sizeGroupTitle === item.sizeGroup);

				// 如果不存在，创建一个新的 group
				if (!group) {
					group = {
						id: i,
						sizeGroupTitle: item.sizeGroup,
						list: []
					};
					result.push(group);
				}
				// 将当前项添加到对应的 group 的 list 中
				group.list.push(item);
			});

			return result;
		},
		extractList(transformedData) {
			return transformedData.reduce((acc, group) => {
				return acc.concat(group.list);
			}, []);
		}

	}
}