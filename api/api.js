
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
const getPreviousImage = '/api/image/get_previous_image'

const getRandomImages = '/api/randomImages/get_random_images'	//获取随机图片
const checkImageFavorite = '/api/imageFavorites/checkImageFavorite'	//用户收藏
const addFavorite = '/api/imageFavorites/addFavorite'	//用户收藏
const removeFavorite = '/api/imageFavorites/removeFavorite'	//用户收藏
const getUserFavorites = '/api/imageFavorites/getUserFavorites'	//用户收藏列表




module.exports = {
	getPreviousImage,
	getUserFavorites,
	removeFavorite,
	addFavorite,
	checkImageFavorite,
	getRandomImages,
	getImagesByTag,
	getImageTags,
	getImageType,
	getWxLogin,
	getImageGroups,
	checkCollection,
	toggleCollect,
	getUserCollections
	
}