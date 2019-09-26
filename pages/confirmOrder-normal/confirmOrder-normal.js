const
  UTIL = require('../../utils/util'),
  AUTH = require('../../utils/auth'),
  ORDER_SERVICE = require('../../service/order.service'),
  ORDER_CONFIRM_SERVICE = require('../../service/order.confirm.service')
/**
 * 确认订单
 * 陈浩
 * 2019/5/8
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category_id:"",
    address: {}, // 地址信息
    goods: [], // 商品信息
    order: {} // 订单信息
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

      // 获取数据
      const {
        goods: [{
          id: goods_id,
        }],
        address: {
          id: address_id
        },
        order: {
          num_all: goods_num,
        },
      } = this.data, {
        message
      } = e.detail.value, {
        id: userid,
        miniapp_openid
      } = wx.getStorageSync('userInfo')

      // 显示加载
      wx.showLoading({
        mask: true,
      })

      // 添加订单详情
      const result = await ORDER_SERVICE.post(userid, goods_id, goods_num, address_id, message, miniapp_openid)

      // 吊起支付
      await UTIL.requestPayment(result.data)

      // 提示
      wx.showModal({
        content: '支付成功',
        showCancel: false,
        success: () => {
          wx.redirectTo({
            url: '/pages/order-list/order-list',
          })
        }
      })
    } catch (e) {

      // 判断错误
      if (e.message == 'requestPayment:fail cancel') return

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
   * 初始化数据
   */
  async init(options) {

    // 获取容器
    const container = this.selectComponent('#container')

    try {

      // 验证登录
      await AUTH.loginStatus()

      // 获取数据
      const result = await ORDER_CONFIRM_SERVICE.normal(wx.getStorageSync('userInfo').id, options.goods_id, options.goods_num)

      // 设置数据
      this.setData({
        address: result.data.address,
        goods: result.data.goods,
        order: {
          goods_money: result.data.goods_money,
          num_all: result.data.num_all,
          postage: result.data.postage,
        },
      })


      // 设置状态为缺省
      container.status('default')
    } catch (e) {

      if (e.message == 'login:fail') {

        // 跳转至授权页
        wx.redirectTo({
          url: getApp().globalData.pages.auth,
        })
      } else {

        // 设置状态
        container.status('error', e.message)
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // 初始化数据
    this.init(options)
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