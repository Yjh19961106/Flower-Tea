const UTIL = require('./utils/util')
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch(options) {

    // 重置密码倒计时计算
    UTIL.countdown('resetCountdown').calc()

    // 登录倒计时计算
    UTIL.countdown('loginCountdown').calc()
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow(options) {

    // 是否是从其他小程序进来
    if ([1037].some(item => options.scene == item)) {
      if (options.referrerInfo.extraData.share) this.globalData.system.shareId = options.referrerInfo.extraData.share
    }

    // 是否分享进来
    if ([1007, 1008, 1011, 1012, 1013,1047,1048,1049].some(item => options.scene == item)) {
      if (options.query.share) this.globalData.system.shareId = options.query.share
      if (options.query.path) this.globalData.pages.enter = decodeURIComponent(options.query.path)
    }
    //是否扫码进入
    if ([1047, 1048, 1049].some(item => options.scene == item)) {
      // if (options.query.share) this.globalData.system.shareId = options.query.share
      // if (options.query.path) this.globalData.pages.enter = decodeURIComponent(options.query.path)
      this.globalData.system.qrcode = true
    }
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide() {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError(msg) {

  },

  /**
   * 全局变量
   */
  globalData: {
    url: {
      host: 'https://hrbfft.com/public/index.php', // 主机地址
      image: 'https://qn.chineseglory.cn', // 图片地址
    }, // 服务地址
    system: {
      qrcode: false,
      shareId: 1,
      color: 'transparent',
      title: '',
      logo: '',
      intro: '',
      cover: '',
      idCode: '6C9B096F76F1891DB84266F8B02554DE',
    }, // 系统信息
    pages: {
      enter: '/pages/home/home', // 进入页面
      auth: '/pages/login/login', // 授权页面
      index: '/pages/home/home', // 首页
    }, // 页面信息
    auth: {
      whiteList: [] // 白名单页面
    } // 授权登录相关配置
  }
})