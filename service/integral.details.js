module.exports = {
  /**
   * 获取积分商城详情
   */
  post(uid, page, type, date) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${getApp().globalData.url.host}/api/Score/score_info`,
        data: {
          uid,
          page,
          type,
          date

        },
        success: result => {
          if (result.statusCode != 200) {
            reject(new Error('网络错误'))
          } else if (result.data.code == 1) {
            if (!result.data.data) result.data.data = []
            resolve(result.data)
          } else {
            reject(new Error(result.data.msg))
          }
        },
        fail: result => {
          reject(new Error('网络错误'))
        }
      })
    })
  }
}