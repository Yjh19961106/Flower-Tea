module.exports = {
  /**
   * 获取订单列表
   */
  list(userid, type, page) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${getApp().globalData.url.host}/api/order/index`,
        data: {
          userid,
          type,
          page
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
  },
  /**
   * 添加订单详情
   */
  post(userid, goods_id, buy_num, address_id, other, openid) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${getApp().globalData.url.host}/api/miniapp/order_add`,
        data: {
          userid,
          goods_id,
          buy_num,
          address_id,
          other,
          openid
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
   * 修改订单详情
   * 当前只存在修改订单状态
   */
  put(order_id) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${getApp().globalData.url.host}/api/Order/take_over`,
        data: {
          order_id,
          token: wx.getStorageSync('userInfo').token
        },
        success: result => {
          resolve(result.data)
        },
        fail: result => {
          reject(result)
        }
      })
    })
  },
  /**
   * 删除订单详情
   */
  delete(order_id) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${getApp().globalData.url.host}/api/Order/del`,
        data: {
          order_id,
          token: wx.getStorageSync('userInfo').token
        },
        success: result => {
          resolve(result.data)
        },
        fail: result => {
          reject(result)
        }
      })
    })
  },
  /**
   * 获取订单详情
   */
  get(order_id) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${getApp().globalData.url.host}/api/order/orderInfo`,
        data: {
          order_id,
          token: wx.getStorageSync('userInfo').token
        },
        success: result => {
          resolve(result.data)
        },
        fail: result => {
          reject(result)
        }
      })
    })
  }
}