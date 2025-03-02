import {
	fetch
} from './fetch.js';
import api from '../api/api.js';
import store from '../store'

// this.$myUtils.getSizeInfo()

export default class myUtils {
	
	static isAllChinese(str) {
	  const chineseRegex = /^[\u4e00-\u9fa5]+$/;
	  return chineseRegex.test(str);
	}
	
	static saveImage(url) {
		uni.downloadFile({
			url,
			success: (downloadRes) => {
				if (downloadRes.statusCode === 200) {
					const tempFilePath = downloadRes.tempFilePath;

					// 保存图片到相册
					uni.saveImageToPhotosAlbum({
						filePath: tempFilePath,
						success: (saveRes) => {
							uni.showToast({
								title: '图片保存成功',
								icon: 'success',
								duration: 2000
							});
						},
						fail: (err) => {
							console.error('保存图片失败', err);
							uni.showToast({
								title: '保存图片失败',
								icon: 'none',
								duration: 2000
							});
						}
					});
				} else {
					console.error('下载图片失败', downloadRes);
					uni.showToast({
						title: '下载图片失败',
						icon: 'none',
						duration: 2000
					});
				}
			},
			fail: (err) => {
				console.error('下载图片失败', err);
				uni.showToast({
					title: '下载图片失败',
					icon: 'none',
					duration: 2000
				});
			}
		});
	}


	static rgbToHex(r, g, b) {
		// 将每个颜色分量转换为两位的十六进制字符串
		const toHex = (component) => {
			const hex = component.toString(16);
			return hex.length === 1 ? '0' + hex : hex;
		};

		// 拼接成HEX颜色值
		return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
	}

	static hexToRgb(hex) {
		// 去掉前面的#号，如果有的话
		hex = hex.replace(/^#/, '');

		// 如果是3位的HEX值，将其转换为6位
		if (hex.length === 3) {
			hex = hex.split('').map(char => char + char).join('');
		}

		// 解析红、绿、蓝三个分量的值
		const bigint = parseInt(hex, 16);
		const r = (bigint >> 16) & 255;
		const g = (bigint >> 8) & 255;
		const b = bigint & 255;

		return {
			r,
			g,
			b
		};
	}

	static getSizeInfo(sizeId) {
		let list = store.getters.getSizeList
		let sizeInfo = list.find(item => item.sizeId === +sizeId)
		return sizeInfo
	}

	static convertToBase64AndUpload(filePath) {
		const fs = uni.getFileSystemManager();
		fs.readFile({
			filePath,
			encoding: 'base64',
			success: (res) => {
				// console.log('转换为Base64成功', res.data);
				return res.data
			},
			fail: (err) => {
				console.error('读取文件失败', err);
			}
		});
	}

	// 秒数转换【00:56】
	static formatSeconds(seconds, dateFormat = 'H:i:s') {
		let obj = {};
		obj.H = Number.parseInt(seconds / 3600);
		obj.i = Number.parseInt((seconds - obj.H * 3600) / 60);
		obj.s = Number.parseInt(seconds - obj.H * 3600 - obj.i * 60);
		if (obj.H < 10) {
			obj.H = '0' + obj.H;
		}
		if (obj.i < 10) {
			obj.i = '0' + obj.i;
		}
		if (obj.s < 10) {
			obj.s = '0' + obj.s;
		}
		let rs = dateFormat.replace('H', obj.H).replace('i', obj.i).replace('s', obj.s).substring(3);
		return rs;
	}

	// 处理登录返回cookie
	static formatCookie(cookieTemp) {
		let fetchCookie = ''
		if (cookieTemp.indexOf('acw_tc=') !== -1) {
			let tempList = cookieTemp.split(',')
			for (var i = 0; i < tempList.length; i++) {
				if (tempList[i].indexOf('acw_tc=') !== -1) {
					tempList.splice(i, 1)
				}
			}
			return fetchCookie = tempList.join(';')
		} else {
			return cookieTemp
		}
	}

	// 判断客户端
	static platformFun() {
		let platform = uni.getSystemInfoSync().platform
		if (platform !== 'android' && platform !== 'ios' && platform !== 'devtools') {
			return false
		} else {
			return false
		}
	}

	// 判断客户端
	static qrImg() {
		return store.getters.getXcxInfo?.qrImg
	}

	// 格式化时间戳
	static getTime(timestamps, sfm) {
		var date = new Date(timestamps);
		var year = date.getFullYear(),
			month = ("0" + (date.getMonth() + 1)).slice(-2),
			sdate = ("0" + date.getDate()).slice(-2),
			hour = ("0" + date.getHours()).slice(-2),
			minute = ("0" + date.getMinutes()).slice(-2),
			second = ("0" + date.getSeconds()).slice(-2);
		var result = sfm ? year + "/" + month + "/" + sdate + " " + hour + ":" + minute + ":" + second : year +
			"/" + month + "/" + sdate;
		return result;
	}

	// 请求充值任务
	static getRechargeTask() {
		fetch(api.finish + 'recharge', '', 'get').then(res => {});
	}

	// 分享功能
	static onShareAppMessage(title, path, imageUrl) {
		console.log('调用公共分享方法-', title, path, imageUrl);
		// let defaultImageUrl = '../../images/share.jpg';
		return {
			title: title, //标题
			path: path, //页面路径
			imageUrl: imageUrl || '', //封面，为空时显示分享时的系统截图
			success(res) {
				console.log("转发成功！");
				if (!res.shareTickets) {
					//分享到个人
					api.shareFriend().then(() => {
						console.warn("shareFriendSuccess!");
						//执行转发成功以后的回调函数
						callback && callback();
					});
				} else {
					//分享到群
					let st = res.shareTickets[0];
					wx.getShareInfo({
						shareTicket: st,
						success(res) {
							let iv = res.iv
							let encryptedData = res.encryptedData;
							api.groupShare(encryptedData, iv).then(() => {
								console.warn("groupShareSuccess!");
								//执行转发成功以后的回调函数
								callback && callback();
							});
						}
					});
				}
			},
			fail: function(res) {
				console.log("转发失败！");
			}
		};
	}

	// 获取时间
	static getMyDate() {
		var now = new Date();
		var year = now.getFullYear(); //得到年份
		var month = now.getMonth(); //得到月份
		var date = now.getDate(); //得到日期
		month = month + 1;
		if (month < 10) month = '0' + month;
		if (date < 10) date = '0' + date;
		var time = year + '-' + month + '-' + date;
		return time;
	}

	//同步取出ext.json对象
	static getExtStoreId(type) {
		try {
			const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {
				shopId: '默认的门店id'
			}
			return extConfig;
		} catch (err) {
			console.log(err, 'getExtStoreId__error')
		}
	}
}