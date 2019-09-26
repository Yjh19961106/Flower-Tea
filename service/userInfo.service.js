const OBSERVE = require('../utils/observe')
module.exports = {
  /**
   * 解密
   */
  encode(openid, sessionKey, encryptedData, iv) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${getApp().globalData.url.host}/api/Wxxiaochengxu/getuserinfo`,
        data: {
          openid,
          sessionKey,
          encryptedData,
          iv
        },
        success: result => {
          if (result.statusCode != 200) {
            reject(new Error('网络错误'))
          } else if (result.data.code == 1) {
            resolve(result.data)
          } else {
            reject(new Error(result.data.msg))
          }
        },
        fail: result => {
          reject(new Error('网络错误'))
        }
      })
    })
  },
  /**
   * 获取用户信息
   */
  get(userid) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${getApp().globalData.url.host}/api/miniapp/user_index`,
        data: {
          userid
        },
        success: result => {
          if (result.statusCode != 200) {
            reject(new Error('网络错误'))
          } else if (result.data.code == 1) {
            const userInfo = wx.getStorageSync('userInfo')
            if (userInfo.token) result.data.data.token = userInfo.token
            wx.setStorageSync('userInfo', Object.assign({}, result.data.data))
            OBSERVE.publish('userInfo')
            resolve(result.data)
          } else {
            reject(new Error(result.data.msg))
          }
        },
        fail: result => {
          reject(new Error('网络错误'))
        }
      })
    })
  },
  /**
   * 添加用户
   */
  post(username, password, mobile, array) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${getApp().globalData.url.host}/api/User/registerall`,
        data: {
          username,
          password,
          mobile,
          email: '',
          array,
        },
        success: result => {
          if (result.statusCode != 200) {
            reject(new Error('网络错误'))
          } else if (result.data.code == 1) {
            resolve(result.data)
          } else {
            reject(new Error(result.data.msg))
          }
        },
        fail: result => {
          reject(new Error('网络错误'))
        }
      })
    })
  },
  /**
   * 修改用户信息
   * 暂时只有修改密码
   */
  put(mobile, newpassword, captcha) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${getApp().globalData.url.host}/api/user/resetpwd`,
        data: {
          mobile,
          newpassword,
          captcha
        },
        success: result => {
          if (result.statusCode != 200) {
            reject(new Error('网络错误'))
          } else if (result.data.code == 1) {
            resolve(result.data)
          } else {
            reject(new Error(result.data.msg))
          }
        },
        fail: result => {
          reject(new Error('网络错误'))
        }
      })
    })
  }
}