// pages/finish-list/finish-list.js
const finishList = require('../../service/finish.list')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array2: ['2019', '2020', '2021'],
    array: ['9', '10', '11', '12', '1', '2', '3', '4', '5', '6', '7', '8'],
    index: 0,
    index1: 0,
    month: "9",
    year: "2019",
    money_sum:"",
    list:[],
  },
  bindPickerChange: function (e) {
    console.log(this.data.date)
    console.log('picker发送选择改变，携带值为', this.data.array[e.detail.value],"month")

    this.setData({
      index: e.detail.value,
      month: this.data.array[e.detail.value]
    })
    this.init();
  },
  //时间
  bindPickerChange2: function (e) {
    console.log(this.data.type)
    console.log('picker发送选择改变，携带值为', this.data.array2[e.detail.value])
    this.setData({
      index1: e.detail.value,
      year: this.data.array2[e.detail.value]
    })
    this.init();
  },

  async init() {

    // 获取容器
    const container = this.selectComponent('#container')

    try {
      const result = await finishList.post(wx.getStorageSync('userInfo').id, 1, this.data.year, this.data.month)
      // const result = await finishList.post(159, 1, this.data.year, this.data.month)

      this.setData({
        money_sum: Number(result.data.money_sum).toFixed(2),
        list:result.data.orders.data
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
    const container = this.selectComponent('#container')


    // 初始化数据
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