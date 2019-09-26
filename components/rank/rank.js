/**
 * 评级
 * 陈浩
 * 2019/4/30
 */
Component({
  behaviors: ['wx://form-field'],
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: Number,
      value: 1
    }, // 当前评级
    max: {
      type: Number,
      value: 5
    } // 最大评级
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
     * 更改级别
     */
    changeRank(e) {

      // 获取级别
      const value = e.currentTarget.dataset.value

      // 设置数据
      this.setData({
        value
      })
    },
  },
})