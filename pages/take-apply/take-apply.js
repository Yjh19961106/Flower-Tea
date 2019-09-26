const
  UTIL = require('../../utils/util'),
  TAKE_SERVICE = require('../../service/take.service'),
  ADDRESS_SERVICE = require('../../service/address.service'),
  USERINFO_SERVICE = require('../../service/userInfo.service')
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
      },
      list: [], // 列表
    }, // 轮播
    userInfo: {}, // 用户信息
    goods: {}, // 商品信息
    apply: {
      count: 1, // 购物车数量
    }, // 申请信息
    address: {} // 地址信息
  },

  /**
   * 更改地址
   */
  changeAddress(e) {
    wx.navigateTo({
      url: '/pages/address-list/address-list',
      events: {
        select: (address) => {

          // 设置数据
          this.setData({
            address
          })

          // 返回
          wx.navigateBack()
        }
      }
    })
  },

  /**
   * 提交
   */
  async submit(e) {

    try {

      // 显示加载
      wx.showLoading({
        mask: true,
      })

      // 获取参数
      const {
        apply,
        goods,
        address
      } = this.data

      // 发送数据
      await TAKE_SERVICE.detail.post(wx.getStorageSync('userInfo').id, apply.count, goods.goods_id, address.id)

      // 提示成功
      wx.showModal({
        content: '提货成功',
        showCancel: false,
        success: () => wx.navigateBack()
      })
    } catch (e) {

      // 显示提示
      wx.showModal({
        content: e.message,
        showCancel: false
      })
    } finally {

      // 隐藏加载
      wx.hideLoading()
    }
  },

  /**
   * 打开购物车
   */
  openCart() {
    this.selectComponent('#cart').open()
  },

  /**
   * 统计
   */
  count(e) {

    // 设置数据
    this.setData({
      'apply.count': e.detail.value,
    })
  },

  /**
   * 初始化数据
   */
  async init(options) {

    // 获取容器
    const container = this.selectComponent('#container')

    try {

      // 获取参数
      const {
        apply,
        goods
      } = this.data

      // 获取数据
      const [address, swiper, userInfo] = await Promise.all([ADDRESS_SERVICE.default(wx.getStorageSync('userInfo').id), TAKE_SERVICE.detail.swiper(goods.goods_id), USERINFO_SERVICE.get(wx.getStorageSync('userInfo').id)])

      // 设置数据
      this.setData({
        address: address.data,
        userInfo: userInfo.data,
        'swiper.list': swiper.data,
      })

      // 设置状态为缺省
      container.status('default')
    } catch (e) {

      // 设置状态为错误
      container.status('error', e.message)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // 获取数据
    this.setData({
      goods: JSON.parse(decodeURIComponent(options.detail))
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

    // 返回分享
    return UTIL.share()
  }
})