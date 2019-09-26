const
  UTIL = require('../../utils/util'),
  SHARE_SERVICE = require('../../service/share.service'),
  USERINFO_SERVICE = require('../../service/userInfo.service')
/**
 * 分享
 * 陈浩
 * 2019/4/30
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: '', // 横幅
    category: {
      list: [] //列表
    }, // 分类
    userInfo: {} // 用户信息
  },

  /**
   * 获取横幅
   */
  getBanner(e) {

    // 设置数据
    this.setData({
      banner: e.detail.value
    })
  },

  /**
   * 跳转海报页
   */
  async poster() {

    try {

      // 显示加载
      wx.showLoading({
        mask: true
      })

      // 获取用户信息
      const userInfo = await USERINFO_SERVICE.get(wx.getStorageSync('userInfo').id)

      // 判断是否拥有权限
      if (userInfo.data.group_id <= 1) {

        // 提示
        wx.showModal({
          content: '请购买商品后开启分享海报功能',
          showCancel: false
        })
      } else {

        // 跳转
        wx.navigateTo({
          url: '/pages/poster/poster',
        })
      }
    } catch (e) {

      // 提示错误
      wx.showModal({
        content: e.message,
        showCancel: false
      })
    } finally {

      // 隐藏加载
      wx.hideLoading()
    }
  },

  /**
   * tab切换
   */
  tabChange(e) {

    // 初始化数据
    this.selectAllComponents('.share-list').forEach((item, index) => {
      if (index == e.detail.contentIndex) item.init()
      else item.clear()
    })
  },

  /**
   * 初始化数据
   */
  async init() {

    // 获取容器
    const container = this.selectComponent('#container')

    try {

      // 获取分类
      const result = await SHARE_SERVICE.category(wx.getStorageSync('userInfo').id)

      // 设置数据
      this.setData({
        'category.list': result.data,
      })

      // 设置状态为缺省
      container.status('default')

      // 初始化分享tab
      this.selectComponent('#tab').init()
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
    await this.selectAllComponents('.share-list')[this.selectComponent('#tab').index().contentIndex].init()

    // 停止下拉
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

    // 添加数据
    this.selectAllComponents('.share-list')[this.selectComponent('#tab').index().contentIndex].onReachBottom()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

    // 返回分享
    return UTIL.share()
  }
})