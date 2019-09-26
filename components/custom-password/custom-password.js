/**
 * 密码
 * 陈浩
 * 2019/5/18
 */
Component({
  behaviors: ['wx://form-field'],
  /**
   * 组件的属性列表
   */
  properties: {
    maxlength: {
      type: Number,
      value: 140
    }, // 最大长度
    placeholder: {
      type: String
    }, // 占位符
    value: {
      type: String
    },
    name: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    view: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 输入
     */
    input(e) {

      this.setData({
        value: e.detail.value
      })
    },

    /**
     * 显示密码
     */
    viewToggle() {

      this.setData({
        view: !this.data.view
      })
    }
  }
})