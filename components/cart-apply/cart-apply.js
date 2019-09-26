/**
 * 购物车
 * 陈浩
 * 2019/4/19
 */
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Object,
    }, // 商品信息
    apply: {
      type: Object
    } // 申请信息
  },

  /**
   * 组件的初始数据
   */
  data: {
    hidden: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 打开
     */
    open() {
      this.setData({
        hidden: false
      })
    },

    /**
     * 关闭
     */
    close() {
      this.setData({
        hidden: true
      })
    },
    
    /**
     * 提交
     */
    submit(e) {

      // 弹出提交
      this.triggerEvent('submit', {
        ...e.detail.value
      })
    }
  },
})