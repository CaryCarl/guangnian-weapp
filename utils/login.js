import {
	fetch
} from './fetch.js';
import api from '../api/api.js';
import store from '../store'

export async function getCodeLogin(tfid, query) {
	return new Promise((resolve, resject) => {
		wx.login({
			success: (res) => {
				console.log('用户信息---', res);
                if (res.code) {
                    let data = {}
                	let dataTemp = {
                    	code: res.code,
                    	userInfo: {},
                    	scope: 'snsapi_base'
                    }
                    if(query) {
                        if(JSON.stringify(query) !== "{}") {
                            data = Object.assign(dataTemp, query)
                        }
                    }
                    data = dataTemp
                	fetch(api.getWxLogin, data, 'post',tfid || '').then(resLogin => {
						console.log('登录信息---', resLogin);
                		
                	})
                } else {
                	console.log('登录失败！')
                }
			},
			fail: resject
		})
	})
}