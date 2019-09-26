// pages/extractList/extractList.js
const extractList = require('../../service/extract.list')
let PAGE = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  async init() {

    // 获取容器
    const container = this.selectComponent('#container')
    // 初始化页号
    PAGE = 1
    try {

      // const result = await extractList.post(wx.getStorageSync('userInf/o').id, 1)
      const result = await extractList.post(wx.getStorageSync('userInfo').id, PAGE)


      this.setData({
        // money_sum: Number(result.data.money_sum).toFixed(2),
        // list: result.data.orders.data
        list: result.data.data
      })

      // 设置状态为下拉或完成
      container.status(result.data.current_page < result.data.last_page ? 'canload' : 'complete')
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
  onLoad: function(options) {
    const container = this.selectComponent('#container')


    // 初始化数据
    this.init()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

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
  async onReachBottom() {

    // 获取容器
    const container = this.selectComponent('#container')

    try {

      // 判断容器状态
      if (container.status() != 'canload') return

      // 获取列表
      const list = this.data.list

      // 设置状态为加载中
      container.status('loading')

      // 获取数据

      // const result = await integralService.list(wx.getStorageSync('userInfo').id, PAGE + 1)
      const result = await extractList.post(159, PAGE + 1)

      // 设置页号
      PAGE += 1

      // 设置数据
      this.setData({
        list: list.concat(result.data.data)
      })

      // 设置状态为下拉或完成
      container.status(result.data.current_page < result.data.last_page ? 'canload' : 'complete')
    } catch (e) {

      // 设置状态为错误
      container.status('error', e.message)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})