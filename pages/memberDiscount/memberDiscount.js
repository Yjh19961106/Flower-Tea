const
  UTIL = require('../../utils/util'),
  AUTH = require('../../utils/auth')
let
  OPTIONS
/**
 * 福利折扣
 * 陈浩
 * 2019/9/5
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 初始化数据
   */
  async init() {

    try {

      // 验证登录
      await AUTH.loginStatus()

      // 初始化数据
      this.selectComponent('.discount-list').init()
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
    await this.selectComponent('.discount-list').init()

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