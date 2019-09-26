const
  UTIL = require('../../utils/util'),
  AUTH = require('../../utils/auth'),
  INCOME_SERVICE = require('../../service/income.service')
let PAGE = 1
/**
 * 收益记录
 * 陈浩
 * 2019/5/7
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    income: {
      list: [] // 列表
    } // 收益
  },

  /**
   * 初始化数据
   */
  async init() {

    // 获取容器
    const container = this.selectComponent('#container')

    try {

      // 验证登录
      await AUTH.loginStatus()

      // 获取参数
      PAGE = 1

      // 获取收益列表数据
      const result = await INCOME_SERVICE.list(wx.getStorageSync('userInfo').id, PAGE)

      // 设置数据
      this.setData({
        'income.list': result.data
      })

      // 设置状态
      container.status('complete')
    } catch (e) {

      if (e.message == 'login:fail') {

        // 跳转至授权页
        wx.redirectTo({
          url: getApp().globalData.pages.auth,
        })
      } else {

        // 设置状态
        container.status('error', e.message)
      }
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
    await this.init()

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