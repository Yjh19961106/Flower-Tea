const UTIL = require('../../utils/util')
const REPLENISH_SERVICE = require('../../service/replenish.service')
const UPLOAD_SERVICE = require('../../service/upload.service')
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
    goods: {}, // 商品信息
    discount: {}, // 折扣
    apply: {
      price: 0, // 指导价（真实价格）
      count: 1, // 购物车数量
      discount: '无' // 折扣（用于显示）
    } // 申请信息
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
        voucher
      } = e.detail.value, {
        apply,
        goods
      } = this.data

      // 判断数据
      UTIL.check(voucher, '请上传支付凭证')

      // 上传图片
      const picture = (await UPLOAD_SERVICE.post(voucher)).data

      // 获取数据
      const result = await REPLENISH_SERVICE.post(wx.getStorageSync('userInfo').id, apply.count, goods.id, picture)

      // 重定向至成功页
      wx.redirectTo({
        url: `/pages/replenish-apply-success/replenish-apply-success?name=${result.data.se_name}&phone=${result.data.phone}&group=${result.data.group}`,
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

    // 统计参数
    this.total()
  },

  /**
   * 统计
   */
  total() {

    // 获取参数
    const {
      apply: {
        count,
        price,
        discount
      },
      goods: {
        money
      },
      discount: {
        least_money,
        join_discount
      }
    } = this.data

    // 价格总计
    const totalMoney = (money * count).toFixed(0)

    // 设置数据
    this.setData({
      'apply.price': least_money > totalMoney ? totalMoney : (totalMoney * (join_discount / 100)).toFixed(2),
      'apply.discount': least_money > totalMoney ? '无' : `${join_discount}%`,
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
      const [discount, swiper] = await Promise.all([REPLENISH_SERVICE.discount(wx.getStorageSync('userInfo').id), REPLENISH_SERVICE.swiper(goods.id)])

      // 设置数据
      this.setData({
        discount: discount.data,
        'swiper.list': swiper.data
      })

      // 统计参数
      this.total()

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