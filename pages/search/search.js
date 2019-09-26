const UTIL = require('../../utils/util')
/**
 * 搜索
 * 陈浩
 * 2019/9/9
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '' // 关键字
  },

  /**
   * 提交搜索
   */
  submit(e) {

    try {

      // 获取参数
      const {
        keyword
      } = e.detail.value

      // 验证
      UTIL.check(keyword.trim(), '请输入搜索内容')

      // 设置参数
      this.setData({
        keyword: keyword.trim()
      })

      // 初始化数据
      this.selectComponent('#search-list').init()
    } catch (e) {

      // 提示
      wx.showToast({
        title: e.message,
        icon: 'none'
      })
    }
  },

  /**
   * 初始化数据
   */
  init() {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  }
})