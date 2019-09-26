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
    category: {
      list: [
        {
          title: '注册福利',
          id: 4
        },
        {
          title: '合伙人福利',
          id: 6
        }
      ]
    },
  },

  /**
   * tab切换
   */
  tabChange(e) {

    // 初始化数据
    this.selectAllComponents('.discount-list')[e.detail.contentIndex].init()
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

      // 设置状态
      container.status('default')

      // 初始化tab
      this.selectComponent('#tab').init(OPTIONS.tab)
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

    // 获取参数
    OPTIONS = options

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

    // 获取下标
    const index = this.selectComponent('#tab').index().contentIndex

    // 初始化数据
    await this.selectAllComponents('.discount-list')[index].init()

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