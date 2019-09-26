module.exports = {
  /**
   * 库存详情
   */
  detail: {
    /**
     * 添加库存详情
     */
    post(userid, goods_id, buy_num, goods_money, parentsendid, img) {
      return new Promise((resolve, reject) => {
        wx.request({
          url: `${getApp().globalData.url.host}/api/Miniapp/add_new_yun`,
          data: {
            userid,
            goods_id,
            buy_num,
            goods_money,
            parentsendid,
            img
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
   * 库存列表
   */
  list: {
    /**
     * 查看库存列表
     */
    get(uid, page) {
      return new Promise((resolve, reject) => {
        wx.request({
          url: `${getApp().globalData.url.host}/api/userstock/statuslist`,
          data: {
            uid,
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
    }
  }
}