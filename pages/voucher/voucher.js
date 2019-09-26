const UITL = require('../../utils/util')
const UPLOAD_SERVICE = require('../../service/upload.service')
/**
 * 上传凭证
 * 陈浩
 * 2019/6/28
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: {}, // 参数
  },

  /**
   * 提交
   */
  async submit(e) {

    try {

      // 获取ID、商品数量
      const {
        goods_id,
        goods_num
      } = this.data.options

      // 获取图片
      let picture = e.detail.value.voucher

      // 如果图片存在则上传
      if (picture) {

        // 显示加载
        wx.showLoading({
          mask: true,
        })

        // 上传图片
        const result = await UPLOAD_SERVICE.post(picture)
        
        // 获取图片
        picture = result.data
      }

      // 确认订单
      wx.redirectTo({
        url: `/pages/confirmOrder-stock/confirmOrder-stock?goods_id=${goods_id}&goods_num=${goods_num}&img=${picture}`,
      })
    } catch (e) {

      // 显示提示
      wx.showModal({
        content: e.message,
        showCancel: false
      })
    } finally {

      // 隐藏加载
      wx.hideLoading()
    }
  },

  /**
   * 初始化数据
   */
  async init() {

    // 设置状态为缺省
    this.selectComponent('#container').status('default')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // 设置数据
    this.setData({
      options
    })

    // 初始化数据
    this.init()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

    // 返回分享
    return UITL.share()
  }
})