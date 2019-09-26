// pages/integralShop/details/details.js
const integralDetais = require('../../../service/integral.details')
let PAGE = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //全部获得 0 签到获得 1 任务获得 2 兑换商品 4 取消订单 5
    array: ['全部获得', '签到获得', '任务获得','兑换商品','取消订单'],
    array2: ['2019-09', '2019-10', '2019-11', '2019-12', '2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-07', '2020-08', '2020-09'],
    index: 0,
    index1: 0,
    type:"0",
    date:"2019-09",
    multiIndex: [0, 0, 0],
    userNum:'',
    userList:[]
   
  },
  // 任务种类
  bindPickerChange: function (e) {
    // console.log(this.data.date)
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    if (e.detail.value ==3 || e.detail.value ==4 ) {
      var num = Number(e.detail.value) + 1
    }else {
      var num = e.detail.value
    }
    console.log(num)
    this.setData({
      index: e.detail.value,
      type: num
    })
    this.init();
  },
  //时间
  bindPickerChange2: function (e) {
    console.log(this.data.type)
    console.log('picker发送选择改变，携带值为', this.data.array2[e.detail.value])
    this.setData({
      index1: e.detail.value,
      date: this.data.array2[e.detail.value]
    })
    this.init();
  },
 aaa:function(){
   console.log(this.data.type)
   console.log(this.data.date)
 },
  async init() {

    // 获取容器
    const container = this.selectComponent('#container')

    // 初始化页号
    PAGE = 1

    try {
      const result = await integralDetais.post(wx.getStorageSync('userInfo').id, PAGE, this.data.type, this.data.date)

      this.setData({
        userNum: result.data.user_score,
        userList: result.data.list.data.reverse()
      })

      // 设置状态为下拉或完成
      container.status(result.data.list.current_page < result.data.list.last_page ? 'canload' : 'complete')
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
    console.log(options)

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
      const list = this.data.userList

      // 设置状态为加载中
      container.status('loading')

      // 获取数据

      const result = await integralDetais.post(wx.getStorageSync('userInfo').id, PAGE+1, this.data.type, this.data.date)

      // 设置页号
      PAGE += 1

      // 设置数据
      this.setData({
        userList: list.concat(result.data.list.data)
      })

      // 设置状态为下拉或完成
      container.status(result.data.list.current_page < result.data.list.last_page ? 'canload' : 'complete')
    } catch (e) {

      // 设置状态为错误
      container.status('error', e.message)
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})