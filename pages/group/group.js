const
  UTIL = require('../../utils/util'),
  AUTH = require('../../utils/auth')
/**
 * 我的团队
 * 陈浩
 * 2019/5/7
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: {
      maxPage: 2 // 最大页数
    }, // 参数
    category: {
      list: [{
          id: '',
          title: '全部',
          count: 0
        },
        {
          id: '用户',
          title: '注册用户',
          count: 0
        },
        {
          id: 'vip',
          title: 'VIP店长',
          count: 0
        },
        {
          id: '银牌',
          title: '银牌店长',
          count: 0
        },
        {
          id: '金牌',
          title: '金牌店长',
          count: 0
        },
        {
          id: '钻石',
          title: '钻石店长',
          count: 0
        },
      ] // 列表
    }, // 分类
  },

  /**
   * 获取统计
   */
  getCount(e) {

    // 获取参数
    const {
      list
    } = this.data.category

    // 处理数据
    list.forEach((item, index) => {
      item.count = e.detail.value[index]
    })

    // 设置数据
    this.setData({
      'category.list': list
    })
  },
  /**
   * tab切换
   */
  tabChange(e) {

    // 初始化列表
    this.selectAllComponents('.group-list')[e.detail.contentIndex].init(this.data.options.id)
  },

  /**
   * 初始化数据
   */
  async init() {

    try {

      // 验证登录
      await AUTH.loginStatus()

      // 设置状态
      this.selectComponent('#container').status('default')

      // 初始化tab
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

    // 获取参数
    this.setData({
      options: Object.assign({
        id: wx.getStorageSync('userInfo').id,
        nickname: wx.getStorageSync('userInfo').name
      }, this.data.options, options)
    })

    wx.setNavigationBarTitle({
      title: `${this.data.options.id == wx.getStorageSync('userInfo').id ? '我' : this.data.options.nickname}的团队`,
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

    // 获取索引
    const {
      contentIndex
    } = this.selectComponent('#tab').index()

    // 初始化数据
    await this.selectAllComponents('.group-list')[contentIndex].init()

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