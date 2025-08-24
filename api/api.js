
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


// --------资源-----------
let resourceIP = "https://qsywebapi.juzishu.cn"
const getCategoryList = resourceIP + '/api/resource/get_category_list'	//获取一级菜单
const getSubcategoryList = resourceIP + '/api/resource/get_subcategory_list'	//获取二级菜单列表
const getMaterialList = resourceIP + '/api/resource/get_material_list_simple'	//获取资料列表
const getMaterialDetail = resourceIP + '/api/resource/get_material_detail'	//获取资料详情



module.exports = {
	getCategoryList,
	getSubcategoryList,
	getMaterialList,
	getMaterialDetail,
	
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