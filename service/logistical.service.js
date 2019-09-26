module.exports = {
  /**
   * 物流详情
   */
  detail: {
    /**
     * 获取物流详情
     */
    get(order_id) {
      return new Promise((resolve, reject) => {
        wx.request({
          url: `${getApp().globalData.url.host}/api/order/virtual`,
          data: {
            token: wx.getStorageSync('userInfo').token,
            order_id
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
  }
}