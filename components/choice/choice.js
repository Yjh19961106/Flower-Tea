/**
 * 选择器
 * 陈浩
 * 2019/4/24
 */
Component({
  behaviors: ['wx://form-field'],

  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String
    },
    value: {
      type: Number,
      value: 0
    },
    list: {
      type: Array,
    }
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
     * 选择按钮
     */
    choice(e) {

      const value = e.currentTarget.dataset.index

      // 设置下标
      this.setData({
        value,
      })

      // 弹出当前选择
      this.triggerEvent('choice', { value })
    }
  }
})