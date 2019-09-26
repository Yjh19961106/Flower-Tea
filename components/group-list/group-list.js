const GROUP_SERVICE = require('../../service/group.service')
let PAGE = 1
/**
 * 团队列表
 * 陈浩
 * 2019/5/7
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    maxPage: {
      type: String,
      value: Infinity,
    }, // 最大页数
    userId: {
      type: String
    }, // 用户ID
    categoryId: {
      type: String
    } // 分类ID
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
     * 跳转
     */
    navigateTo(e) {

      // 统计页数
      const count = getCurrentPages().reduce((count, page) => {
        return page.route == 'pages/group/group' ? count + 1 : count + 0
      }, 0)

      // 不超过maxPage页则可以打开
      if (count < this.data.maxPage) {

        // 获取用户信息
        const index = e.currentTarget.dataset.index

        // 获取用户信息
        const {
          id,
          nickname
        } = this.data.list[index]

        // 跳转
        wx.navigateTo({
          url: `/pages/group-list/group-list?id=${id}&nickname=${nickname}`
        })
      }
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

        // 获取分类id、用户ID、页号
        const {
          categoryId,
          userId,
        } = this.data
        PAGE = 1

        // 获取组员列表
        const result = await GROUP_SERVICE.list(userId, categoryId, PAGE)


        // 设置数据
        this.setData({
          list: result.data[0],
        })

        // 弹出人数统计数据
        this.triggerEvent('count', {
          value: [
            result.data.count_all,
            result.data.count_1,
            result.data.count_2,
            result.data.count_3,
            result.data.count_4,
            result.data.count_5,
          ]
        })

        // 设置状态为完成 // 暂无分页
        container.status('complete')
      } catch (e) {

        // 设置状态为错误
        container.status('error', e.message)
      }
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },
  }
})