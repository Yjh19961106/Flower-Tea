const
  UTIL = require('../../utils/util'),
  TEAM_PURCHASE_SERVICE = require('../../service/teamPurchase.service')
let PAGE = 1
/**
 * 团队进货明细
 * 陈浩
 * 2019/6/29
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamPurchase: {
      list: [], // 列表
    }, // 团队进货
  },

  /**
   * 进入详情
   */
  enterDetail(e) {

    // 获取参数
    const {
      year,
      month,
    } = this.data.options, {
      id
    } = e.currentTarget.dataset

    wx.navigateTo({
      url: `/pages/teamPurchase-detail/teamPurchase-detail?year=${year}&month=${month}&id=${id}`,
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
        year,
        month,
        id = wx.getStorageSync('userInfo').id
      } = this.data.options

      // 初始化页号
      PAGE = 1

      // 获取团队进货数据
      const result = await TEAM_PURCHASE_SERVICE.get(id, year, month, PAGE)

      // 设置数据
      this.setData({
        'teamPurchase.list': result.data.data
      })

      // 设置状态为缺省
      container.status(result.data.current_page >= result.data.last_page ? 'complete' : 'canload')
    } catch (e) {

      // 设置状态为错误
      container.status('error', e.message)
    }
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
  async onPullDownRefresh() {

    // 初始化数据
    await this.init()

    // 停止下拉
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  async onReachBottom() {

    // 获取容器
    const container = this.selectComponent('#container')

    try {

      // 判断加载
      if (container.status() != 'canload') return

      // 设置状态为加载
      container.status('loading')

      // 获取参数
      const {
        year,
        month,
        id = wx.getStorageSync('userInfo').id
      } = this.data.options

      // 获取团队进货数据
      const result = await TEAM_PURCHASE_SERVICE.get(id, year, month, PAGE + 1)

      // 设置页号
      PAGE += 1

      // 设置数据
      this.setData({
        'teamPurchase.list': result.data.data
      })

      // 设置状态为缺省
      container.status(result.data.current_page >= result.data.last_page ? 'complete' : 'canload')
    } catch (e) {

      // 设置状态为错误
      container.status('error', e.message)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

    // 返回分享
    return UTIL.share()
  }
})