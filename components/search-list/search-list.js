const
  GOODS_SERVICE = require('../../service/goods.service')
/**
 * 搜索列表
 * 陈浩
 * 2019/9/5
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    keyword: {
      type: String,
    } // 关键字
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
        
        // 获取数据
        const result = await GOODS_SERVICE.search(this.data.keyword, wx.getStorageSync('userInfo').id)

        // 设置数据
        this.setData({
          list: result.data.goods
        })

        // 设置状态
        container.status(result.data.goods.length > 0 ? 'canload' : 'complete')
      } catch (e) {

        // 设置状态
        container.status('error', e.message)
      }
    }
  }
})