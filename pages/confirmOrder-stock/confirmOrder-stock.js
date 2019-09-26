const
  UTIL = require('../../utils/util'),
  ORDER_CONFIRM_SERVICE = require('../../service/order.confirm.service'),
  STOCK_SERVICE = require('../../service/stock.service')
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
    goods: [], // 商品信息
    order: {}, // 订单信息
    parent: {}, // 上级信息
    voucher: '' // 凭证
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
        order: {
          num_all: goods_num,
          goods_money
        },
        parent: {
          parentsendid,
        },
        voucher
      } = this.data

      const {
        message
      } = e.detail.value

      const {
        id: userid,
        openid
      } = wx.getStorageSync('userInfo')

      // 显示加载
      wx.showLoading({
        mask: true,
      })

      // 添加订单详情
      const result = await STOCK_SERVICE.detail.post(userid, goods_id, goods_num, goods_money, parentsendid, voucher)

      // 提示
      wx.showModal({
        content: result.msg,
        showCancel: false,
        success: () => {
          wx.navigateBack()
        }
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
   * 初始化数据
   */
  async init(options) {

    // 获取容器
    const container = this.selectComponent('#container')

    try {

      // 获取用户数据
      const result = await ORDER_CONFIRM_SERVICE.stock(wx.getStorageSync('userInfo').id, options.goods_id, options.goods_num, options.img)

      // 设置数据
      this.setData({
        goods: [result.data.goods],
        parent: result.data.parent,
        voucher: result.data.img2,
        order: {
          goods_money: result.data.goods_money,
          num_all: result.data.num
        }
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