module.exports = {
  /**
   * 获取团队列表
   */
  list(userid, id, page) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${getApp().globalData.url.host}/api/user/myteam`,
        // url: `${getApp().globalData.url.host}/api/Comein/children`,
        data: {
          userid,
          id,
          page
        },
        success: result => {
          if (result.statusCode != 200) {
            reject(new Error('网络错误'))
          } else if (result.data.code == 1) {
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