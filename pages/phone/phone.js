const
  UTIL = require('../../utils/util'),
  AUTH = require('../../utils/auth'),
  USERINFO_SERVICE = require('../../service/userInfo.service'),
  LOGIN_SERVICE = require('../../service/login.service')
let
  SESSION_KEY,
  OPENID
/**
 * 登录
 * 陈浩
 * 2019/4/24
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 显示加载
   */
  beforeOpenType() {
    wx.showLoading({
      mask: true,
    })
  },

  /**
   * 获取手机号
   */
  async getphonenumber(e) {

    try {

      // 判断确定
      if (e.detail.errMsg != 'getPhoneNumber:ok') return

      // 获取加密数据
      const {
        encryptedData,
        iv
      } = e.detail

      // 发送数据
      const result = await USERINFO_SERVICE.encode(OPENID, SESSION_KEY, encryptedData, iv)

      // 判断注册
      if (result.data.is_old == 1) {

        // 获取用户信息
        await USERINFO_SERVICE.get(result.data.user_id)

        // 已注册，返回上一页
        wx.navigateBack()
      } else {

        // 保存电话
        wx.setStorageSync('userInfo', {
          mobile: result.data.phoneNumber,
          ...wx.getStorageSync('userInfo')
        })

        // 跳转注册
        wx.redirectTo({
          url: '/pages/register/register',
        })
      }
    } catch (e) {

      // 错误提示
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
  async init() {

    // 微信登录
    const login = await AUTH.login()

    // 获取sessionKey与openid
    const result = await LOGIN_SERVICE.encode(login.code)

    // 设置数据
    SESSION_KEY = result.data.session_key
    OPENID = result.data.openid

    // 设置系统信息
    this.setData({
      logo: getApp().globalData.system.logo,
      title: getApp().globalData.system.title
    })

    // 设置状态
    this.selectComponent('#container').status('default')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // 隐藏分享
    wx.hideShareMenu()

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

  }
})