
// 用户登录
const getWxLogin = '/api/wxlogin'

// 获取首页图片分组
const getImageGroups = '/api/getImageGroups'
const checkCollection = '/api/checkCollection'
const toggleCollect = '/api/toggleCollect'
const getUserCollections = '/api/getUserCollections'

const getImageType = '/api/get_image_type'
const getImageTags = '/api/get_image_tags'
const getImagesByTag = '/api/image/get_images_by_tag'




module.exports = {
	getImagesByTag,
	getImageTags,
	getImageType,
	getWxLogin,
	getImageGroups,
	checkCollection,
	toggleCollect,
	getUserCollections
	
}