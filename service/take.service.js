module.exports = {
  /**
   * 提货列表
   */
  list: {
    /**
     * 查看提货列表
     */
    get(uid, page) {
      return new Promise((resolve, reject) => {
        wx.request({
          url: `${getApp().globalData.url.host}/api/userstock/ttock`,
          data: {
            uid,
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
  },
  /**
   * 提货详情
   */
  detail: {
    /**
     * 获取提货轮播
     */
    swiper(goods_id) {
      return new Promise((resolve, reject) => {
        wx.request({
          url: `${getApp().globalData.url.host}/api/miniapp/banner`,
          data: {
            goods_id
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
    },
    /**
     * 增加提货详情
     */
    post(uid, num, goods_id, address_id) {
      return new Promise((resolve, reject) => {
        wx.request({
          url: `${getApp().globalData.url.host}/api/userstock/ttockset`,
          data: {
            uid,
            num,
            goods_id,
            address_id
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
}