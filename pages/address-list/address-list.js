const
  UTIL = require('../../utils/util'),
  AUTH = require('../../utils/auth'),
  ADDRESS_SERVICE = require('../../service/address.service')
/**
 * 地址
 * 陈浩
 * 2018/12/3
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {
      list: [] // 列表
    } // 地址
  },

  /**
   * 添加地址
   */
  postAddress() {
    wx.navigateTo({
      url: '/pages/address-form/address-form',
      events: {
        init: () => this.init()
      }
    })
  },

  /**
   * 修改地址
   */
  putAddress(e) {

    // 获取地址
    const address = this.data.address.list[e.currentTarget.dataset.index]

    // 跳转页面
    wx.navigateTo({
      url: `/pages/address-form/address-form?id=${address.id}`,
      events: {
        init: () => this.init()
      }
    })
  },

  /**
   * 选择地址
   */
  selectAddress(e) {
    this.getOpenerEventChannel().emit('select', this.data.address.list[e.currentTarget.dataset.index])
  },

  /**
   * 移除地址
   */
  deleteAddress(e) {

    wx.showModal({
      content: '确认删除该地址？',
      success: async res => {

        try {

          if (!res.confirm) return

          // 获取地址
          const address = this.data.address.list[e.currentTarget.dataset.index]

          // 验证默认地址
          UTIL.check(address.status != 1, '该地址不能删除')

          // 提示加载
          wx.showLoading({
            mask: true,
          })

          // 删除地址
          const result = await ADDRESS_SERVICE.delete(address.id)

          // 提示
          wx.showModal({
            content: result.msg,
            showCancel: false
          })

          // 初始化数据
          this.init()
        } catch (e) {

          // 提示错误
          wx.showModal({
            content: e.message,
            showCancel: false
          })
        } finally {

          // 隐藏加载
          wx.hideLoading()
        }
      }
    })
  },

  /**
   * 初始化数据
   */
  async init() {

    // 获取容器
    const container = this.selectComponent('#container')

    try {

      // 验证登录
      await AUTH.loginStatus()

      // 获取数据
      const result = await ADDRESS_SERVICE.list(wx.getStorageSync('userInfo').id)

      // 设置数据
      this.setData({
        'address.list': result.data,
      })

      // 设置状态
      container.status('complete')
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
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

    // 分享
    return UTIL.share()
  }
})