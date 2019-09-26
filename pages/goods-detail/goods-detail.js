const
  UTIL = require('../../utils/util'),
  GOODS_SERVICE = require('../../service/goods.service')
/**
 * 商品详情
 * 陈浩
 * 2019/4/19
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
      postage : "包邮",
     
    }, // 商品信息
    comment: [], // 评论列表
    specs: 0, // 规格
    count: 1,
    userNum:""
  },

  /**
   * 改变购物车
   */
  cartChange(e) {

    const {
      count,
      specs
    } = e.detail

    this.setData({
      count,
      specs
    })
  },

  /**
   * 打开购物车
   */
  openCart() {
    this.selectComponent('#cart').open()
  },

  /**
   * 购物车提交结算
   */
  submit(e) {
    wx.navigateTo({
      url: `/pages/confirmOrder-normal/confirmOrder-normal?goods_id=${this.data.goods.id}&goods_num=${e.detail.count * this.data.goods.goods_num}`,
    })
  },

  /**
   * 初始化数据
   */
  async init() {

    // 获取容器
    const container = this.selectComponent('#container')

    try {

      // 获取参数
      const {
        id
      } = this.data.goods

      // 获取商品
      const goods = await GOODS_SERVICE.get(wx.getStorageSync('userInfo').id, id)

      // 设置缺省数
      goods.data.can_buy_num = 100

      // 设置数据
      this.setData({
        goods: goods.data,
      })

      // 设置标题
      wx.setNavigationBarTitle({
        title: goods.data.name,
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

    // 获取商品id
    this.setData({
      'goods.id': options.id,
      usernum: options.usernum
    })
    
    console.log(this.data.usernum+"aaa")

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

    const {
      name: intro,
      thumb: cover,
      id
    } = this.data.goods

    console.log(UTIL.share({
      intro,
      cover,
      path: '/pages/goods-detail/goods-detail',
      params: {
        id
      }
    }))

    // 返回分享
    return UTIL.share({
      intro,
      cover,
      path: '/pages/goods-detail/goods-detail',
      params: {
        id
      }
    })
  }
})