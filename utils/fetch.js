// const baseUrl = 'http://192.168.5.22:3080';
const baseUrl = 'https://www.imgadmin.juzishu.cn';

import store from '../store'

import myUtils from './myUtils.js'
var fetchCookie = ''
let fetch = function(url, data = {}, method, tfid) {
    let tempUrl = url
    let acJoin = fetchCookie
    let cookie = store.getters.getCookie || uni.getStorageSync('cookie') || ''
    // 处理登录成功异常cookie
    if(cookie.indexOf('acw_tc=') !== -1) {
    	let tempList = cookie.split(',')
    	for(var i=0; i<tempList.length; i++) {
    		if(tempList[i].indexOf('acw_tc=') !== -1) {
    			tempList.splice(i, 1)
    		}
    	}
    	acJoin = tempList.join(';')
    }
    if(url.indexOf('/api/wxLogin') !== -1) {
        acJoin = ''
        cookie = ''
    }
	let isFormData = false
	if(url.indexOf('/api/photo/image') !== -1) {
	    isFormData = true
	}
	
	let header = {
		"Content-Type": "application/json",
		"x-wx-openid":store.getters.userInfo?.openid || uni.getStorageSync('userId') || ''
	}
	return new Promise((resolve, reject) => {
		url = url.indexOf('http') !== -1 ? url : baseUrl + url
		uni.request({
				url,
				method,
				data,
				header
			})
			.then((res) => {
				resolve(res[1])
			})
			.catch((err) => {
				let errs = '服务器错误，稍后再试'
				reject(err)
			})
	})
}

export {
	fetch
}
