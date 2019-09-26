/**
 * 商品列表
 * 陈浩
 * 2019/4/19
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
    share: {
      type: Boolean,
      value: true
    } // 是否分享
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

    share() {

    },
    /**
     * 提示
     */
    tips() {
      wx.showModal({
        content: '请先成为店主',
        showCancel: false
      })
    }
  }
})