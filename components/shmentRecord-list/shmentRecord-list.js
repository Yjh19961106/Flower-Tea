const SHMENT_SERVICE = require('../../service/shment.service')
let PAGE = 1
/**
 * 转移记录-列表
 * 陈浩
 * 2019/5/7
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [] // 列表
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 初始化数据
     */
    async init() {

      // 获取容器
      const container = this.selectComponent('.container')

      try {

        // 设置状态为初始化
        container.status('init')

        // 初始化页号
        PAGE = 1

        // 获取列表
        const result = await SHMENT_SERVICE.record(wx.getStorageSync('userInfo').id, PAGE)

        // 设置数据
        this.setData({
          list: result.data
        })

        // 设置状态为完成 // 暂无分页
        container.status('complete')
      } catch (e) {

        // 设置状态为错误
        container.status('error', e.message)
      } finally {

        // 停止下拉
        this.selectComponent('.transferRecord-list').stopPullDownRefresh()
      }
    }
  }
})