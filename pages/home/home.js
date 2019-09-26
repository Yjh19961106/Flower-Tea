const
  UTIL = require('../../utils/util'),
  AUTH = require('../../utils/auth'),
  HOME_SERVICE = require('../../service/home.service'),
  GOODS_SERVICE = require('../../service/goods.service'),
  SYSTEM_SERVICE = require('../../service/system.service')
let PAGE = 1
/**
 * 主页
 * 陈浩 于家辉
 * 2019/9/23
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper: {
      options: {
        autoplay: true,
        circular: true,
        indicatorDots: true,
        indicatorColor: 'rgba(255, 255, 255, 0.4)',
        indicatorActiveColor: 'rgba(0, 0, 0, 0.6)'
      }, // 配置
      list: [], // 列表
    }, // 轮播
    goods: {
      list: [], // 列表
      page: 1, // 页号
    } // 商品
  },

  /**
   * 初始化数据
   */
  async init() {

    // 获取容器
    const container = this.selectComponent('#container')

    try {

      // 获取系统信息
      await SYSTEM_SERVICE.get()

      // 初始化页号
      PAGE = 1

      // 获取数据
      const [swiperList, goodsList] = await Promise.all([HOME_SERVICE.swiper(), GOODS_SERVICE.list(wx.getStorageSync('userInfo').id, 1, PAGE)])

      // 设置数据
      this.setData({
        'swiper.list': swiperList.data,
        'goods.list': goodsList.data.data,
      })

      // 设置状态为下拉或完成
      container.status(goodsList.data.current_page < goodsList.data.last_page ? 'canload' : 'complete')
    } catch (e) {

      // 设置状态为错误
      container.status('error', e.message)
    }
  },
  /**
   * 点击横幅跳转
   */
  LinkToIntegral(){
    wx.navigateTo({
      url: '/pages/integralShop/integralShop',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // var a = options.share
    // 获取容器
    const container = this.selectComponent('#container')

    // 跳转至enter页
    UTIL.router(getApp().globalData.pages.enter)

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
      const result = await GOODS_SERVICE.list(wx.getStorageSync('userInfo').id, PAGE + 1)

      // 设置页号
      PAGE += 1

      // 设置数据
      this.setData({
        'goods.list': list.concat(result.data)
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
  onShareAppMessage(e) {

    if (e.from == 'button') {

      // 获取数据
      const {
        intro,
        cover,
        id
      } = e.target.dataset

      // 返回分享
      return UTIL.share({
        intro,
        cover,
        path: '/pages/goods-detail/goods-detail',
        params: {
          id
        }
      })
    } else if (e.from == 'menu') {

      // 返回分享
      return UTIL.share()
    }
  }
})