const
  UTIL = require('../../utils/util'),
  AUTH = require('../../utils/auth')
/**
 * 我的订单
 * 陈浩
 * 2019/5/7
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: {
      list: [{
          id: 0,
          title: '全部'
        },
        {
          id: '未支付',
          title: '未支付'
        },
        {
          id: 1,
          title: '已支付'
        },
        {
          id: 2,
          title: '已发货'
        },
        {
          id: 6,
          title: '待评价'
        },
        {
          id: 9,
          title: '已完成'
        },
      ] // 列表
    }, // 分类
  },

  /**
   * tab切换
   */
  tabChange(e) {

    // 初始化列表
    this.selectAllComponents('.order-list')[e.detail.contentIndex].init()
  },

  /**
   * 初始化数据
   */
  async init() {

    try {

      // 验证登录
      await AUTH.loginStatus()

      // 设置容器为缺省
      this.selectComponent('#container').status('default')

      // tab初始化
      this.selectComponent('#tab').init()
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

    // 获取下标
    const {
      contentIndex
    } = this.selectComponent('#tab').index()

    // 初始化列表
    await this.selectAllComponents('.order-list')[contentIndex].init()

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