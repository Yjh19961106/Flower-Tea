const util = require('../../utils/util')
const teamSalesService = require('../../service/teamSales.service')
/**
 * 团队销售额
 * 陈浩
 * 2019/5/4
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamSales: {
      total: 0, // 总数
      list: [], // 列表
    }, // 团队销售额
    year: {
      current: new Date().getFullYear(), // 选中年份
      max: new Date().getFullYear(), // 最大年份
    } // 年份
  },

  /**
   * 更改年份
   */
  yearChange(e) {
    
    // 获取年份
    this.setData({
      'year.current': e.detail.value
    })

    // 初始化数据
    this.init()
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

      // 获取团队销售数据
      const result = await teamSalesService.get(wx.getStorageSync('userInfo').id, this.data.year.current)

      // 设置数据
      this.setData({
        teamSales: {
          total: result.data.all,
          list: result.data.mo
        }
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