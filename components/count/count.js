/**
 * 计数
 * 陈浩
 * 2019/4/25
 */
let superIncrease, superDecrease;

Component({
  behaviors: ['wx://form-field'],
  /**
   * 组件的属性列表
   */
  properties: {
    min: {
      type: Number,
      value: 1,
    }, // 最小数值
    max: {
      type: Number,
      value: Infinity,
    }, // 最大数值
    step: {
      type: Number,
      value: 1,
    }, // 单步
    value: {
      type: Number,
      value: 1,
      observer(value) {

        // 弹出更改
        this.triggerEvent('change', {
          value
        })
      }
    },
    name: {
      type: String,
    }
  },

  /**
   * 数据监听
   */
  observers: {
    /**
     * 监听禁用
     */
    'value, step, min, max'() {

      const {
        max,
        min,
        value,
        step
      } = this.data

      this.setData({
        disabled: {
          max: value + step > max,
          min: value - step < min
        }
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    disabled: {
      max: false, // 最大禁用
      min: false, // 最小禁用
    } // 按钮禁用
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 减少
     */
    decrease() {

      // 获取条件
      const {
        step,
        max,
        min
      } = this.data
      let {
        value
      } = this.data

      // 计算结果
      if ((value -= step) >= min) {

        // 设置结果
        this.setData({
          value
        })

        // 弹出更改
        this.triggerEvent('change', {
          value
        })
      }
    },
    /**
     * 增加
     */
    increase() {

      // 获取条件
      const {
        step,
        max,
        min
      } = this.data
      let {
        value
      } = this.data

      // 计算结果
      if ((value += step) <= max) {

        // 设置结果
        this.setData({
          value
        })

        // 弹出更改
        this.triggerEvent('change', {
          value
        })
      }
    },
    /**
     * 长按减少开始
     */
    superDecreaseStart() {
      superDecrease = setInterval(() => {
        this.decrease()
      }, 150)
    },
    /**
     * 长按减少结束
     */
    superDecreaseStop() {
      clearInterval(superDecrease)
    },
    /**
     * 长按增加开始
     */
    superIncreaseStart() {
      superIncrease = setInterval(() => {
        this.increase()
      }, 150)
    },
    /**
     * 长按增加结束
     */
    superIncreaseStop() {
      clearInterval(superIncrease)
    }
  },
})