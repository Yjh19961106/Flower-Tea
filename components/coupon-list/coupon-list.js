const COUPON_SERVICE = require('../../service/coupon.service')
/**
 * 优惠券列表
 * 陈浩
 * 2019/5/7
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categoryId: {
      type: String,
    } // 分类ID
  },

  /**
   * 组件的初始数据
   */
  data: {
    page: 1, // 页号
    list: [] // 列表
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 使用优惠券
     */
    couponDetail() {
      wx.switchTab({
        url: '/pages/home/home',
      })
    },

    /**
     * 初始化数据
     */
    async init() {

      // 获取容器
      const container = this.selectComponent('.container')

      try {

        // 设置状态为初始化
        container.status('init')

        // 获取分类id、初始化页号
        const
          page = this.data.page = 1,
          categoryId = this.data.categoryId

        // 获取优惠券列表
        const reuslt = await COUPON_SERVICE.list(wx.getStorageSync('userInfo').id, categoryId, page)

        // 设置数据
        this.setData({
          list: result.data
        })
      } catch (e) {

        // 设置状态为完成 // 暂无下拉
        container.status('complete')
      } finally {

        // 停止下拉
        this.selectComponent('.custom-scroll').stopPullDownRefresh()
      }
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    async onReachBottom() {

      // 获取容器
      const container = this.selectComponent('.container')

      try {

        // 是否可加载
        if (container.status() != 'canload') return

        // 获取分类ID、列表、页号
        const
          categoryId = this.data.categoryId,
          list = this.data.list,
          page = ++this.data.page

        // 设置状态为加载中
        container.status('loading')

        // 优惠券列表
        const result = await COUPON_SERVICE.get(wx.getStorageSync('userInfo').id, categoryId, page)

        // 设置数据
        this.setData({
          list: list.concat(result.data)
        })
      } catch (e) {

        // 设置状态为错误
        container.status('error', e.message)
      }
    },
  }
})