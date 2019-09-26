const
  UTIL = require('../../utils/util'),
  REPLENISH_SERVICE = require('../../service/replenish.service')
/**
 * 补货申请
 * 陈浩
 * 2019/6/27
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    replenish: {
      list: [], // 列表
      page: 1, // 页号
    } // 补货
  },

  /**
   * 前往详情
   */
  detail(e) {

    // 获取元素
    const detail = encodeURIComponent(JSON.stringify(this.data.replenish.list[e.currentTarget.dataset.index]))

    // 跳转
    wx.navigateTo({
      url: `/pages/replenish-apply/replenish-apply?detail=${detail}`,
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

      // 获取页号
      const page = this.data.replenish.page = 1

      // 获取数据
      const result = await REPLENISH_SERVICE.list(wx.getStorageSync('userInfo').id, page)

      // 设置数据
      this.setData({
        'replenish.list': result.data,
      })

      // 设置状态为完成
      container.status('complete')
    } catch (e) {

      // 设置状态为错误
      container.status('error', e.message)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
  async onPullDownRefresh() {

    // 初始化数据
    this.init()

    // 停止下拉
    wx.stopPullDownRefresh()
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