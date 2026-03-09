
// 用户登录
const getWxLogin = '/api/wxlogin'

// 获取首页图片分组
const getImageGroups = '/api/wallpaper/getImageGroups'
const checkCollection = '/api/wallpaper/checkCollection'
const toggleCollect = '/api/wallpaper/toggleCollect'
const getUserCollections = '/api/wallpaper/getUserCollections'

const getImageType = '/api/wallpaper/get_image_type'
const getImageTags = '/api/wallpaper/get_image_tags'
const getImagesByTag = '/api/image/get_images_by_tag'
const getPreviousImage = '/api/image/get_previous_image'

const getRandomImages = '/api/randomImages/get_random_images'	//获取随机图片
const checkImageFavorite = '/api/imageFavorites/checkImageFavorite'	//用户收藏
const addFavorite = '/api/imageFavorites/addFavorite'	//用户收藏
const removeFavorite = '/api/imageFavorites/removeFavorite'	//用户收藏
const getUserFavorites = '/api/imageFavorites/getUserFavorites'	//用户收藏列表


// --------资源-----------
const getCategoryList = '/api/resource/get_category_list'	//获取一级菜单
const getSubcategoryList ='/api/resource/get_subcategory_list'	//获取二级菜单列表
const getMaterialList = '/api/resource/get_material_list_simple'	//获取资料列表
const getMaterialDetail = '/api/resource/get_material_detail'	//获取资料详情
const addMaterialFavorite = '/api/resource/addMaterialFavorite'	//收藏资料
const removeMaterialFavorite = '/api/resource/removeMaterialFavorite'	//取消收藏资料
const checkMaterialFavorite = '/api/resource/checkMaterialFavorite'	//查询资料收藏状态
const getUserMaterialFavoriteList = '/api/resource/getUserMaterialFavoriteList'	//查询收藏列表






module.exports = {
	getCategoryList,
	getSubcategoryList,
	getMaterialList,
	getMaterialDetail,
	addMaterialFavorite,
	checkMaterialFavorite,
	removeMaterialFavorite,
	getUserMaterialFavoriteList,
	
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