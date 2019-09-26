const
  UTIL = require('../../utils/util'),
  STOCK_SERVICE = require('../../service/stock.service')
/**
 * 出库详情
 * 陈浩
 * 2019/6/29
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 提交
   */
  async submit(e) {

    try {

      // 获取参数
      const {
        value: {
          message
        },
        target: {
          dataset: {
            status
          }
        }
      } = e.detail, {
        id,
        sender_id
      } = this.data

      // 显示加载
      wx.showLoading({
        mask: true,
      })

      // 如果拒绝则验证理由
      if (status == 3) util.check(message, '拒绝理由不能为空')

      // 修改出货状态
      await STOCK_SERVICE.put(sender_id, id, status, message)

      // 推送库存
      this.getOpenerEventChannel().emit('init')

      // 返回
      wx.navigateBack()
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
  async init(options) {

    // 设置状态为缺省
    this.selectComponent('#container').status('default')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // 获取数据
    this.setData(JSON.parse(options.detail))

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
    return util.share()
  }
})