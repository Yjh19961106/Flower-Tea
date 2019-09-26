module.exports = {
  /**
   * 解密用户信息
   */
  encode(code) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${getApp().globalData.url.host}/api/wxxiaochengxu/getOpenid`,
        data: {
          code
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
   * 用户登录
   */
  login(type, value) {
    return new Promise((resolve, reject) => {
      switch (type) {
        case 'password':
          wx.request({
            url: `${getApp().globalData.url.host}/api/miniapp/login`,
            data: {
              account: value.phone,
              password: value.password,
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
          break;
        case 'captcha':
          wx.request({
            url: `${getApp().globalData.url.host}/api/miniapp/mobilelogin`,
            data: {
              mobile: value.phone,
              captcha: value.captcha,
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
          break;
      }
    })
  }
}