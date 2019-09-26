const OBSERVE = require('../../utils/observe')
let VIDEO_OBSERVE
/**
 * 自定义视频
 * 陈浩
 * 2019/5/14
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String
    }, // 视频源
    cover: {
      type: String
    } // 封面图片
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 播放视频
     */
    play() {

      // 推送播放
      OBSERVE.publish('Video', this.data.src)
    }
  },

  /**
   * 生命周期
   */
  lifetimes: {
    /**
     * 在组件在视图层布局完成后执行
     */
    ready() {

      // 获取视频实例
      const video = wx.createVideoContext('custom-video', this)

      // 订阅播放
      VIDEO_OBSERVE = OBSERVE.subscribe('Video', (src) => {

        // 停止播放
        if (this.data.src != src) video.pause()
      }, {
        proxy: true,
      })
    },
    /**
     * 在组件实例被从页面节点树移除时执行
     */
    detached() {
      OBSERVE.unsubscribe('Video', VIDEO_OBSERVE)
    }
  },

  /**
   * 页面生命周期
   */
  pageLifetimes: {
    /**
     * 组件所在的页面被展示时执行
     */
    show() {

      // 获取视频实例
      const video = wx.createVideoContext('custom-video', this)

      // 暂停
      video.pause()
    },
  }
})