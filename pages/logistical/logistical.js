const UTIL = require('../../utils/util')
const LOGISTICAL_DETAIL_SERVICE = require('../../service/logistical.service')
/**
 * 物流详情
 * 陈浩
 * 2019/5/18
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logistical: {}
  },

  /**
   * 初始化数据
   */
  async init() {

    // 获取容器
    const container = this.selectComponent('#container')

    try {

      // 设置状态为初始化
      container.status('init')

      // 获取参数
      const {
        id
      } = this.data.options

      // 获取订单详情
      const result = await LOGISTICAL_DETAIL_SERVICE.detail.get(id)

      // 设置数据
      this.setData({
        logistical: result.data
      })

      // 设置状态为缺省
      container.status('default')

    } catch (e) {

      // 设置状态为错误
      container.status('default', e.message)
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
    return UTIL.share()
  }
})