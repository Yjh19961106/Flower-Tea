const
  UTIL = require('../../utils/util'),
  OBSERVE = require('../../utils/observe'),
  USERINFO_SERVICE = require('../../service/userInfo.service'),
  CAPTCHA_SERVICE = require('../../service/captcha.service')
let COUNTDOWN
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
    captcha: {
      status: false, // 状态
      countdown: 0 // 倒计时
    }, // 验证码
  },

  /**
   * 表单提交
   */
  formSubmit(e) {

    // 获取提交类型
    const submitType = e.detail.target.dataset.submit

    // 提交
    this[submitType](e)
  },

  /**
   * 重置
   */
  async reset(e) {

    try {

      // 获取数据
      const {
        phone,
        password,
        confirmPassword,
        captcha
      } = e.detail.value

      // 显示加载
      wx.showLoading({
        mask: true
      })

      // 验证数据
      UTIL.check(phone, '请输入正确的手机号码', /^1\d{10}$/)
      UTIL.check(captcha, '验证码不能为空')
      UTIL.check(password, '请输入6-20位密码', /^\w{6,20}$/)
      UTIL.check(confirmPassword, '请检查确认密码', `^${password}$`)

      // 获取数据
      const result = await USERINFO_SERVICE.put(phone, password, captcha)

      // 显示提示
      wx.showModal({
        content: result.msg,
        showCancel: false,
        success: res => {
          if (result.code == 1) wx.navigateBack()
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
   * 获取验证码
   */
  async getCaptcha(e) {

    try {

      // 获取表单数据
      const {
        phone
      } = e.detail.value

      // 显示加载
      wx.showLoading({
        mask: true
      })

      // 验证数据
      UTIL.check(phone, '请输入正确的手机号码', /^1\d{10}$/)

      // 发送数据
      const result = await CAPTCHA_SERVICE.get(phone, 'resetpwd')

      // 倒计时开始
      UTIL.countdown('resetCountdown').start(60)

      // 隐藏加载
      wx.hideLoading()

      // 显示提示
      wx.showToast({
        title: result.msg,
        icon: 'none'
      })
    } catch (e) {

      // 隐藏加载
      wx.hideLoading()

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
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // 订阅倒计时
    COUNTDOWN = OBSERVE.subscribe('resetCountdown', countdown => {

      this.setData({
        captcha: {
          status: countdown != 0,
          countdown
        }
      })
    }, {
      proxy: true,
    })

    // 设置状态
    this.selectComponent('#container').status('default')
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

    // 取消订阅
    OBSERVE.subscribe('resetCountdown', COUNTDOWN)
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