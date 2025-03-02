export async function chooseFromAlbum(tfid, query) {
	return new Promise((resolve, resject) => {
		uni.chooseImage({
			count: 1, // 选择一张图片
			sourceType: ['album'], // 只允许从相册选择
			success: (res) => {
				if (res.tempFilePaths.length > 0) {
					// let filePath = res.tempFilePaths[0]
					resolve(res)
					// const fs = uni.getFileSystemManager();
					// fs.readFile({
					// 	filePath,
					// 	encoding: 'base64',
					// 	success: (res) => {
					// 		resolve(res)
					// 	},
					// 	fail: (err) => {
					// 		console.error('读取文件失败', err);
					// 		resject(err)
					// 	}
					// });
				}
			},
			fail: (err) => {
				console.error('从相册选择失败', err);
				resject(err)
			}
		});
	})
}


export async function convertToBase64(filePath) {
	return new Promise((resolve, resject) => {
		const fs = uni.getFileSystemManager();
		fs.readFile({
			filePath,
			encoding: 'base64',
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				console.error('读取文件失败', err);
				resject(err)
			}
		});

	})
}