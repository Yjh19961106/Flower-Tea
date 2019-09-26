const
  UTIL = require('../../utils/util'),
  AUTH = require('../../utils/auth'),
  QR_CODE = require('../../utils/weapp-qrcode'),
  POSTER_SERVICE = require('../../service/poster.service'),
  USERINFO_SERVICE = require('../../service/userInfo.service')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 合成图片
   */
  createPoster(url, avatar, background) {
    return new Promise(resolve => {

      // 获取画布
      const canvas = wx.createCanvasContext('poster')

      // 设置背景宽高
      const backgroundWidth = UTIL.rpx(750)
      const backgroundHeight = UTIL.rpx(1320)

      // 获取二维码宽高
      const codeWidth = UTIL.rpx(200)
      const codeHeight = UTIL.rpx(200)

      // 绘制背景
      canvas.drawImage(background, 0, 0, backgroundWidth, backgroundHeight)
      canvas.drawImage(avatar, UTIL.rpx(40), UTIL.rpx(40), UTIL.rpx(140), UTIL.rpx(140))

      // 二维码占位框
      canvas.rect(backgroundWidth / 2 - codeWidth / 2 - UTIL.rpx(10), UTIL.rpx(940) - UTIL.rpx(10), codeWidth + UTIL.rpx(20), codeHeight + UTIL.rpx(20))
      canvas.setFillStyle('#FFFFFF')
      canvas.fill()

      // 绘制
      canvas.draw(false)

      // 二维码参数
      const qrcode = new QR_CODE('poster', {
        width: codeWidth,
        height: codeHeight,
        x: backgroundWidth / 2 - codeWidth / 2,
        y: UTIL.rpx(940),
        colorDark: getApp().globalData.system.color,
        colorLight: "#FFF",
        correctLevel: QR_CODE.CorrectLevel.H,
      })

      // 绘制二维码
      qrcode.makeCode(url, function() {
        resolve()
      })
    })
  },

  /**
   * 下载二维码
   */
  async saveImage() {

    try {

      // 显示加载
      wx.showLoading({
        mask: true,
      })

      // 判断权限
      const result = await AUTH.getAuth('writePhotosAlbum')

      // 验证
      UTIL.check(result.code != 2, 'auth:fail')

      // 获取地址
      wx.canvasToTempFilePath({
        canvasId: 'poster',
        fileType: 'jpg',
        quality: 1,
        success: (res) => {

          // 下载
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: () => {

              // 隐藏加载
              wx.hideLoading()

              // 隐藏加载
              wx.showToast({
                title: '保存图片成功',
              })
            }
          })
        }
      })
    } catch (e) {

      // 隐藏加载
      wx.hideLoading()

      if (e.message == 'auth:fail') {

        // 提示
        wx.showModal({
          content: '未授权下载权限',
          confirmText: '授权',
          success: res => {
            if (res.confirm) wx.openSetting()
          },
        })
      }
    }
  },

  /**
   * 过滤图片地址
   */
  filterImage(url) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: url,
        success: res => {
          resolve(res.path)
        },
        fail: res => {
          reject(new Error('图片处理错误'))
        }
      })
    })
  },

  /**
   * 初始化数据
   */
  async init() {

    // 获取容器
    const container = this.selectComponent('#container')

    try {

      // 获取数据
      const result = await POSTER_SERVICE.get(wx.getStorageSync('userInfo').id)

      // 获取图片本地地址
      const [avatar, background] = await Promise.all([this.filterImage(result.data[0].avatar), this.filterImage(result.data[0].poster_image)])

      // 设置状态
      container.status('default')

      // 绘制海报
      await this.createPoster(`https://www.hrbfft.com/public/index.php/index/register.html?parentid=${wx.getStorageSync('userInfo').id}`, avatar, background)
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

    // 返回分享
    return UTIL.share()
  }
})