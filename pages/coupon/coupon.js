const UTIL = require('../../utils/util')
/**
 * 优惠券
 * 陈浩
 * 2019/5/9
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: {
      list: [{
          id: 0,
          title: '待使用'
        },
        {
          id: 1,
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
    this.selectAllComponents('.coupon-list')[e.detail.contentIndex].init()
  },

  /**
   * 初始化数据
   */
  init() {

    // 设置状态为缺省
    this.selectComponent('#container').status('default')

    // 初始化优惠券tab
    this.selectComponent('#tab').init()
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
    return UTIL.share()
  }
})