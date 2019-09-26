const util = require('./util')

module.exports = {
  /**
   * 获取授权状态
   */
  getAuth(auth) {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          if (res.authSetting[`scope.${auth}`] === true) {
            resolve({
              code: 1,
              msg: '权限已获得'
            })
          } else if (res.authSetting[`scope.${auth}`] === false) {
            resolve({
              code: 2,
              msg: '权限已拒绝'
            })
          } else if (res.authSetting[`scope.${auth}`] === undefined) {
            resolve({
              code: 3,
              msg: '权限未获得'
            })
          }
        }
      })
    })
  },

  /**
   * 微信登陆
   */
  login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          resolve(res)
        },
        fail: res => {
          reject(res)
        }
      })
    })
  },

  /**
   * 检测应用登录状态
   */
  loginStatus() {
    return new Promise((resolve, reject) => {

      // 检测登录
      this.getAuth('userInfo').then(result => {

        // 如果未登录
        if (result.code == 2 || result.code == 3 || !wx.getStorageSync('userInfo').id) {

          // 检测白名单
          if (!getApp().globalData.auth.whiteList.some(item => getApp().globalData.pages.enter.includes(item))) {

            // 未登录，且进入页不在白名单中
            reject(new Error('login:fail'))
          } else {

            // 未登录，且进入页在白名单中
            resolve()
          }
        } else {

          // 已登录
          resolve()
        }
      })
    })
  }
}