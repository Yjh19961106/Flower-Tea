module.exports = {
  /**
   * 上传文件
   */
  post(filePath) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: `${getApp().globalData.url.host}/api/Order/uploadimg`,
        filePath,
        name: 'file',
        success: result => {
          if (result.statusCode != 200) {
            reject(new Error('网络错误'))
          } else {
            result.data = JSON.parse(result.data)
            if (result.data.code == 1) {
              resolve(result.data)
            } else {
              reject(new Error(result.data.msg))
            }
          }
        },
        fail: result => {
          reject(new Error('网络错误'))
        }
      })
    })
  },
}