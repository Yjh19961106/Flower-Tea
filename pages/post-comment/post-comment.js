const UTIL = require('../../utils/util')
const COMMENT_DETAIL_SERVICE = require('../../service/comment.service')
/**
 * 订单评价
 * 陈浩
 * 2019/5/13
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: {}, // 设置
    comment: {}, // 评论
    rank: {
      max: 5, // 最高值
      value: 5 // 当前值
    }, // 评级
    pictrue: {
      max: 3, // 最多数量
      list: [] // 列表
    } // 照片
  },

  /**
   * 添加照片
   */
  chooseImage(e) {

    // 获取列表
    const list = this.data.pictrue.list

    // 设置数据
    this.setData({
      'pictrue.list': list.concat(e.detail.value)
    })
  },

  /**
   * 删除图片
   */
  deleteImage(e) {

    // 获取列表
    const list = this.data.pictrue.list

    // 删除数据
    list.splice(e.detail.value, 1)

    // 设置数据
    this.setData({
      'pictrue.list': list
    })
  },

  /**
   * 提交
   */
  async submit(e) {

    try {

      // 获取参数
      const {
        comment,
        pictrue,
        rank
      } = e.detail.value, {
        goodsId,
        orderId
      } = this.data.options

      // 显示加载
      wx.showLoading({
        mask: true
      })

      // 发送数据
      const result = await COMMENT_DETAIL_SERVICE.post(comment, rank, wx.getStorageSync('userInfo').id, goodsId, orderId)

      // 显示提示
      wx.showModal({
        content: result.msg,
        showCancel: false,
        success: res => wx.navigateBack()
      })
    } catch (e) {

      // 提示错误
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
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // 获取参数
    this.setData({
      options
    })
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
    return UTIL.share()
  }
})