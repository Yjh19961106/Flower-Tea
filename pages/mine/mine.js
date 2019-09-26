const
  UTIL = require('../../utils/util'),
  AUTH = require('../../utils/auth'),
  OBSERVE = require('../../utils/observe'),
  USERINFO_SERVICE = require('../../service/userInfo.service')
/**
 * 我的
 * 陈浩
 * 2019/4/19
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, // 用户信息
    menu: {
      list: [{
          icon: '/images/userInfo/order.png',
          title: '我的订单',
          url: '/pages/order/order',
        },
        {
          icon: '/images/userInfo/address.png',
          title: '收货地址',
          url: '/pages/address-list/address-list',
        },
        {
          icon: '/images/userInfo/server.png',
          title: '客服',
          url: '/pages/service/service',
        },
      ], // 列表1
      list2: [{
        icon: '/images/mine/a.png',
        title: '成单情况',
        url: '/pages/finish-list/finish-list',
      },
      {
        icon: '/images/mine/b.png',
        title: '团队信息',
        url: '/pages/teamMessage/teamMessage',
      },
      {
        icon: '/images/mine/c.png',
        title: '提现记录',
        url: '/pages/extractList/extractList',
      },
      ] // 列表2
    }, // 菜单
    button: {
      list: [{
          title: '我的团队',
          url: '/pages/group/group',
        },
        {
          title: '收益记录',
          url: '/pages/income-list/income-list',
        },
      ] // 列表
    }, // 按钮
    column: {
      list: [{
          icon: '/images/userInfo/replenish.png',
          title: '补货申请',
          url: '/pages/replenish/replenish',
        },
        {
          icon: '/images/userInfo/take.png',
          title: '提货申请',
          url: '/pages/take/take',
        },
        {
          icon: '/images/userInfo/deliveryStock.png',
          title: '出库提醒',
          url: '/pages/deliveryStock/deliveryStock',
        },
        {
          icon: '/images/userInfo/transferRecord.png',
          title: '转移记录',
          url: '/pages/transferRecord/transferRecord',
        },
      ] // 列表
    } // 纵列
  },

  /**
   * 提现
   */
  cashOut() {
    wx.showModal({
      content: '请下载APP提现',
      showCancel: false
    })
  },

  /**
   * 用户登录
   */
  login() {

    // 登录
    wx.navigateTo({
      url: getApp().globalData.pages.auth,
    })
  },

  /**
   * 用户退出
   */
  logout() {

    // 清除缓存
    wx.removeStorageSync('userInfo')

    // 推送用户信息
    OBSERVE.publish('userInfo')
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

      // 获取用户数据
      const result = await USERINFO_SERVICE.get(wx.getStorageSync('userInfo').id)
      
      // 设置状态
      container.status('default')
    } catch (e) {

      if (e.message == 'login:fail') {

        // 设置状态
        container.status('default')
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

    // 订阅用户信息
    OBSERVE.subscribe('userInfo', () => {

      // 设置数据
      this.setData({
        userInfo: wx.getStorageSync('userInfo')
      })
    })
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