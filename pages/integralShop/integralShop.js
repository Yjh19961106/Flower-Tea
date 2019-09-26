// pages/integralShop/integralShop.js
const integralService = require('../../service/integral.service')
const clickSignIn = require('../../service/click.signIn')
const clickGet = require('../../service/click.get')
let PAGE = 1
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgList: [{
        img: "/images/integralshop/insert.png"
      },
      {
        img: "/images/integralshop/level.png"
      },
      {
        img: "/images/integralshop/list.png"
      }
    ],
    msgList: [],
    page: 1, // 页号
    goodsList: [],
    score_user: "",
    score_click: "",
     goods: {
      list: [], // 列表
      page: 1, // 页号
    } // 商品
  },
  /**
   * 跳转到商品详情
   */
  linkToDetails(e) {
    console.log(e.currentTarget.dataset.id)
    console.log(this.data.score_user)
    var a = this.data.score_user
    wx.navigateTo({
      url: `/pages/goods-detail/goods-detail?id=${e.currentTarget.dataset.id}&usernum=${a}`,
    })
  },
  /**
   * 跳转签到规则
   */
  linkToRules() {
    wx.navigateTo({
      url: '/pages/rules/rules',
    })
  },
  /**
   * 跳转积分明细
   */
  linkToDetail() {
    wx.navigateTo({
      url: 'details/details',
    })
  },
  linkToDetail1(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  /**
   * 点击签到
   */
  async signIn(e) {
    console.log("签到")
    try {
      const result = await clickSignIn.post(wx.getStorageSync('userInfo').id)
      wx.showModal({
        content: '签到成功',
        showCancel: false,
      })
      this.init();
    } catch (e) {
      if (e.message == 'login:fail') {
        // 设置状态
      } else {
        // 设置状态
      }
    }
  },
  /**
   * 点击已签到
   */
  signIn2() {
    wx.showModal({
      content: '签到过了',
      showCancel: false,
    })
  },
  signIn3(){
   wx.navigateTo({
     url: '/pages/login/login',
   })
  },
  /**
   * 点击领取
   */
  async getScore(e) {
    console.log(e.currentTarget.dataset.mission_id)
    console.log(e.currentTarget.dataset.score)
    try {
      const result = await clickGet.post(wx.getStorageSync('userInfo').id, e.currentTarget.dataset.mission_id, e.currentTarget.dataset.score)
      wx.showModal({
        content: '领取成功',
        showCancel: false,
      })
      this.init();
    } catch (e) {
      if (e.message == 'login:fail') {
        // 设置状态
      } else {
        // 设置状态
      }
    }
  },
  async init() {

    // 获取容器
    const container = this.selectComponent('#container')

    // 初始化页号
    PAGE = 1

    try {
      const result = await integralService.list(wx.getStorageSync('userInfo').id, PAGE)
      console.log(result.data.score_user)
      // 设置数据
      this.setData({
        'score_user': result.data.score_user,
        "score_click": result.data.score_click,
        'msgList': result.data.score_mission,
        'goods.list': result.data.goods.data
      })

      
      // 设置状态为下拉或完成
      container.status(result.data.goods.current_page < result.data.goods.last_page ? 'canload' : 'complete')
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
    // 获取容器
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
    this.init();
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
      const list = this.data.goods.list

      // 设置状态为加载中
      container.status('loading')

      // 获取数据
      
      const result = await integralService.list(wx.getStorageSync('userInfo').id, PAGE +1)

      // 设置页号
      PAGE += 1

      // 设置数据
      this.setData({
        'goods.list': list.concat(result.data.goods.data)
      })

      // 设置状态为下拉或完成
      container.status(result.data.goods.current_page < result.data.goods.last_page ? 'canload' : 'complete')
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