const
  UTIL = require('../../utils/util'),
  ORDER_SERVICE = require('../../service/order.service')
/**
 * 订单详情
 * 陈浩
 * 2019/5/7
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {}, // 订单信息
    address: {}, // 地址信息
    goods: {} // 商品信息
  },

  /**
   * 进入物流
   */
  logistical(e) {

    // 获取参数
    const {
      virtual_sn,
      id
    } = this.data.order

    // 判断是否能够跳转
    if (!virtual_sn) return

    // 跳转
    wx.navigateTo({
      url: `/pages/logistical/logistical?id=${id}`,
    })
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
      } = this.data.order

      // 获取订单详情
      const result = await ORDER_SERVICE.get(id)

      // 设置数据
      this.setData({
        order: result.data.order,
        address: result.data.address,
        goods: result.data.goods
      })

      // 设置状态为缺省
      container.status('default')
    } catch (e) {

      // 设置状态为错误
      container.status('error', e.message)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // 获取ID
    this.setData({
      'order.id': options.id
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

    // 返回转发
    return util.share()
  }
})