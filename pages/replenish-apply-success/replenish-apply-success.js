const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apply: {
      name: '', // 代理商姓名
      group: '', // 代理商等级
      phone: '' // 代理商电话
    } // 申请信息
  },

  /**
   * 初始化数据
   */
  async init(options) {

    // 获取容器
    const container = this.selectComponent('#container').status('default')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // 获取数据
    this.setData({
      apply: options
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