const OBSERVE = require('../../utils/observe')
/**
 * 首页垂直列表
 * 陈浩
 * 2019/9/5
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Array,
      value: []
    }, // 商品列表
  },

  /**
   * 组件的初始数据
   */
  data: {
    share: false // 分享
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  /**
   * 生命周期
   */
  lifetimes: {
    ready() {

      // 订阅用户信息
      OBSERVE.subscribe('userInfo', () => {

        // 设置数据
        this.setData({
          share: wx.getStorageSync('userInfo').group_id > 1
        })
      }, {
        proxy: true
      })
    }
  }
})