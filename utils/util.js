const observe = require('./observe.js')

module.exports = {

  /**
   * 获取特殊映射参数
   */
  mapParam(url) {

    // 获取key与value
    const [key, value] = url.split('#')

    // 获取参数
    const params = value.split('$').reduce((result, item) => {
      const [key, value] = item.split('-')
      result.push({
        key,
        value
      })
      return result
    }, [])

    // 返回数据
    return {
      key,
      params,
      value: params.reduce((string, item, index) => string + `${index==0?'?':'&'}${item.key}=${item.value}`, '')
    }
  },

  /**
   * 路由跳转
   */
  router(url) {
    wx.navigateTo({
      url,
      fail: () => {
        wx.switchTab({
          url,
          fail: () => {

            // 获取参数
            const newUrl = this.mapParam(url)

            // 重新跳转
            this.router(`${getApp().globalData.pages.map[newUrl.key]}${newUrl.value}`)
          }
        })
      }
    })
  },

  /**
   * rpx转换
   */
  rpx(value) {
    return value * wx.getSystemInfoSync().screenWidth / 750
  },

  /**
   * 分享
   */
  share({
    path = '',
    params = {},
    intro = '',
    cover = ''
  } = {}) {

    // 分享参数
    let shareParams = ''

    // 路径参数
    let pathParams = ''

    // 拼接路径参数
    for (let key in params) {
      if (params[key] !== undefined || params[key] !== null) {
        pathParams += `&${key}=${params[key]}`
      }
    }

    // 拼接跳转的地址
    if (path) {

      // 拼接路径参数并处理多余字符
      shareParams += `&path=${encodeURIComponent(`${path}?${pathParams.substring(1)}`)}`
    }

    // 拼接分享者id
    if (wx.getStorageSync('userInfo').id) {
      shareParams += `&share=${wx.getStorageSync('userInfo').id}`
    }

    // 处理多余字符
    shareParams = shareParams.substring(1)

    return {
      title: intro || getApp().globalData.system.intro,
      imageUrl: cover || getApp().globalData.system.cover,
      path: `${getApp().globalData.pages.index}?${shareParams}`
    }
  },

  /**
   * 验证码倒计时
   */
  countdown(key) {
    return {
      /**
       * 倒计时开始
       */
      start(limit) {
        wx.setStorageSync(key, {
          time: new Date().getTime(),
          limit
        })
        this.calc()
      },
      /**
       * 倒计时计算
       */
      calc() {

        // 获取倒计时信息
        const countdown = wx.getStorageSync(key)

        // 如果倒计时存在
        if (countdown) {

          // 倒计秒数
          const countdownTime = Math.floor(countdown.limit - (new Date().getTime() - countdown.time) / 1000)

          // 如果大于0秒
          if (countdownTime >= 0) {

            // 推送秒数
            observe.publish(key, countdownTime)

            // 倒计时
            setTimeout(() => {

              this.calc()
            }, 1000)
          }
        }
      }
    }
  },

  /**
   * 检查格式
   */
  check(value, msg, pattern) {

    // 如果正则公式存在
    if (pattern) {

      // 获取正则
      const reg = new RegExp(pattern)

      // 判断正则，不符合则抛出异常
      if (!reg.test(value)) throw new Error(msg)
    } else {

      // 判断布尔值，为否则抛出异常
      if (!value) throw new Error(msg)
    }
  },

  /**
   * 支付
   */
  requestPayment(data) {
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: data.signType,
        paySign: data.paySign,
        success: resolve,
        fail: result => {
          reject(new Error(result.errMsg))
        }
      })
    })
  },

  /**
   * 下载文件
   */
  downloadFile(url) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url,
        success: resolve,
        fail: reject
      })
    })
  },

  /**
   * 保存图片
   */
  saveImageToPhotosAlbum(filePath) {
    return new Promise((resolve, reject) => {
      // 下载图片
      wx.saveImageToPhotosAlbum({
        filePath,
        success: resolve,
        fail: reject
      })
    })
  },

  /**
   * 保存视频
   */
  saveVideoToPhotosAlbum(filePath) {
    return new Promise((resolve, reject) => {
      // 下载图片
      wx.saveVideoToPhotosAlbum({
        filePath,
        success: resolve,
        fail: reject
      })
    })
  }
}