const
  UTIL = require('../../utils/util'),
  OBSERVE = require('../../utils/observe'),
  AUTH = require('../../utils/auth'),
  USERINFO_SERVICE = require('../../service/userInfo.service'),
  LOGIN_SERVICE = require('../../service/login.service')
let
  SESSION_KEY,
  OPENID,
  OPTIONS
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
    phone: ''
  },

  /**
   * 表单提交
   */
  async formSubmit(e) {

    try {

      // 获取表单数据
      const {
        phone,
        password,
      } = e.detail.value, {
        shareId,
        qrcode
      } = getApp().globalData.system, {
        nickName,
        avatarUrl,
        openId
      } = wx.getStorageSync('userInfo')

      // 验证
      UTIL.check(password, '请输入6-20位密码', /^\w{6,20}$/)

      // 显示加载
      wx.showLoading({
        mask: true
      })

      const array = {
        nickname: nickName,
        avatar: avatarUrl,
        miniapp_openid: openId,
        group_id: 1,
        parentid: shareId
      }

      if (qrcode) {
        array.qrparentid = shareId
      }

      // 发送数据
      const result = await USERINFO_SERVICE.post(phone, password, phone, array)

      // 获取用户信息
      await USERINFO_SERVICE.get(result.data.userinfo.id)

      // 成功后跳转至首页
      wx.reLaunch({
        url: getApp().globalData.pages.index,
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
  async init() {

    // 获取电话
    this.setData({
      phone: wx.getStorageSync('userInfo').mobile
    })

    // 设置状态
    this.selectComponent('#container').status('default')
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