const
  UTIL = require('../../utils/util'),
  GOODS_SERVICE = require('../../service/goods.service'),
  USERINFO_SERVICE = require('../../service/userInfo.service')
let
  OPTIONS,
  PAGE = 1
/*
 * 商品列表
 * 陈浩
 * 2019/6/27
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    share: false,
    goods: {
      list: [] // 列表
    }, // 商品
    userInfo: {} // 用户信息
  },

  /**
   * 初始化数据
   */
  async init() {

    // 获取容器
    const container = this.selectComponent('#container')

    try {

      // 设置状态为初始化
      container.status('init')

      // 初始化页号
      PAGE = 1

      // 获取数据
      const [goods, userInfo] = await Promise.all([GOODS_SERVICE.list(wx.getStorageSync('userInfo').id, OPTIONS.id, PAGE), USERINFO_SERVICE.get(wx.getStorageSync('userInfo').id)])

      // 设置数据
      this.setData({
        'goods.list': goods.data.data,
        userInfo: userInfo.data,
        share: !(userInfo.group_id <= 2 && OPTIONS.id == 2)
      })

      // 设置状态为下拉或完成
      container.status(goods.data.current_page < goods.data.last_page ? 'canload' : 'complete')
    } catch (e) {

      // 设置状态为错误
      container.status('error', e.message)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // 获取参数
    OPTIONS = options

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
      const result = await GOODS_SERVICE.list(wx.getStorageSync('userInfo').id, OPTIONS.id, PAGE)

      // 设置页号
      PAGE += 1

      // 设置数据
      this.setData({
        'goods.list': list.concat(result.data)
      })

      // 设置状态为下拉或完成
      container.status(result.data.length > 0 ? 'canload' : 'complete')
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