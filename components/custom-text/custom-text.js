const
  UTIL = require('../../utils/util')

/**
 * 自定义文本
 * 陈浩
 * 2019/7/16
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: '',
    }, // 文本内容
    lineHeight: {
      type: String,
      value: '40rpx'
    },
    line: {
      type: Number,
      value: 5
    }, // 行数
    status: {
      type: String,
      value: 'none'
    } // 隐藏状态 show/hide/none/default
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 显示
     */
    show() {
      this.setData({
        status: 'show'
      })
    },

    /**
     * 隐藏
     */
    hide() {
      this.setData({
        status: 'hide'
      })
    },
  },
  /**
   * 定义生命周期方法
   */
  lifetimes: {
    /**
     * 在组件在视图层布局完成后执行
     */
    ready() {

      // 开始监听
      this.createIntersectionObserver()
        .relativeTo('.custom-text-outer')
        .observe('.custom-text-content', res => {
          if (this.data.status != 'none') return
          this.setData({
            status: res.intersectionRatio < 1 ? 'hide' : 'default'
          })
        })
    },

    /**
     * 在组件实例被从页面节点树移除时执行
     */
    detached() {

      // 销毁监听
      this.createIntersectionObserver().disconnect()
    }
  },
})