let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
import {
	fetch
} from '../../utils/fetch.js';
import api from '../../api/api.js';
export default {
	state: {
		xcxInfo: {}, //小程序信息
		userInfo: null, //用户信息
		taskInfo: [], //任务列表信息
		// 我的邀请别人的参数
		inviteInfo: {
			openId: '',
			completeId: ''
		},
		// 我作为被邀请者登录时传的参
		inviteInfoLogin: uni.getStorageSync('inviteInfoLogin') || {
			openId: '',
			completeId: ''
		},
		osName: '', //设备信息
		menuButtonInfo, //头部胶囊信息
		templateId: [], //订阅消息模板ID
		cookie: '',
		tfid: uni.getStorageSync('tfid') || null, //推广链接进来的参数
        screencapState:false,    //是否录屏状态
        coverImage:'',
        fileImg:'https://qiezidj-resource.oss-cn-shenzhen.aliyuncs.com',
		sizeList:[]
	},
	getters: {
		getSizeList(state) {
			return state.sizeList
		},
        getFileImg(state) {
        	return state.fileImg
        },
        getCoverImage(state) {
        	return state.coverImage
        },
        getScreencapState(state) {
        	return state.screencapState
        },
		getXcxInfo(state) {
			return state.xcxInfo
		},
		getUserInfo(state) {
			return state.userInfo
		},
		getTaskInfo(state) {
			return state.taskInfo
		},
		getInviteInfo(state) {
			return state.inviteInfo
		},
		getInviteInfoLogin(state) {
			return state.inviteInfoLogin
		},
		getOsName(state) {
			return state.osName
		},
		getMenuButtonInfo(state) {
			return state.menuButtonInfo
		},
		getTemplateId(state) {
			return state.templateId
		},
		getCookie(state) {
			return state.cookie
		},
		getTfid(state) {
			return state.tfid
		},
	},
	mutations: {
		setSizeList(state, value) {
			state.sizeList = value
		},
        setFileImg(state, value) {
        	state.fileImg = value
        },
        setCoverImage(state, value) {
        	state.coverImage = value
        },
        setScreencapState(state, value) {
        	state.screencapState = value
        },
		setXcxInfo(state, value) {
			state.xcxInfo = value
		},
		// 获取用户信息
		setUserInfo(state, value) {
			state.userInfo = value
		},
		setTaskInfo(state, value) {
			state.taskInfo = value
		},
		setInviteInfo(state, value) {
			state.inviteInfo = value
		},
		setInviteInfoLogin(state, value) {
			state.inviteInfoLogin = value
		},
		setOsName(state, value) {
			state.osName = value
		},
		setTemplateId(state, value) {
			state.templateId = value
		},
		setCookie(state, value) {
			state.cookie = value
		},
		setTfid(state, value) {
			state.tfid = value
		},
	},
	actions: {
		setSizeList({
			commit,
			state
		}, value) {
			commit('setSizeList', value)
		},
        setScreencapState({
        	commit,
        	state
        }, value) {
        	commit('setScreencapState', value)
        },
		setXcxInfo({
			commit,
			state
		}, value) {
			commit('setXcxInfo', value)
		},
		// 获取用户信息
		setUserInfo({
			commit,
			state
		}, value) {
            commit('setUserInfo', value)
		},
		setTaskInfo({
			commit,
			state
		}, value) {
			commit('setTaskInfo', value)
		},
		setInviteInfo({
			commit,
			state
		}, value) {
			commit('setInviteInfo', value)
		},
		setInviteInfoLogin({
			commit,
			state
		}, value) {
			commit('setInviteInfoLogin', value)
		},
		setOsName({
			commit,
			state
		}, value) {
			commit('setOsName', value)
		},
		setTemplateId({
			commit,
			state
		}, value) {
			commit('setTemplateId', value)
		},
		setCookie({
			commit,
			state
		}, value) {
			commit('setCookie', value)
		},
		setTfid({
			commit,
			state
		}, value) {
			commit('setTfid', value)
		},
	}
}
