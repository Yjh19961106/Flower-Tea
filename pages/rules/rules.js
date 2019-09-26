
const dayRules = require('../../service/day.rules')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:""
  },
  async init() {

    // 获取容器
    const container = this.selectComponent('#container')

    try {

      // 设置状态为初始化
      container.status('init')

      const result = await dayRules.get()
      console.log(result)
      this.setData({
        msg:result.data
      })

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
  onLoad: function (options) {
    this.init()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})