const
  UTIL = require('../../utils/util'),
  ORDER_SERVICE = require('../../service/order.service'),
  ORDER_CONFIRM_SERVICE = require('../../service/order.confirm.service')
let PAGE = 1
/**
 * 订单列表
 * 陈浩
 * 2019/5/7
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
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
     * 初始化数据
     */
    async init() {

      // 获取容器
      const container = this.selectComponent('.container')

      try {

        // 设置状态为初始化
        container.status('init')

        // 初始化页号、获取分类id
        const categoryId = this.data.categoryId
        PAGE = 1

        // 获取列表
        const result = await ORDER_SERVICE.list(wx.getStorageSync('userInfo').id, categoryId, PAGE)

        // 设置数据
        this.setData({
          list: result.data
        })

        // 设置状态为完成 // 暂无分页
        container.status('complete')
      } catch (e) {

        // 设置状态为错误
        container.status('error', e.message)
      }
    },

    /**
     * 取消订单
     */
    deleteOrder(e) {

      wx.showModal({
        content: '是否取消该订单？',
        success: async res => {

          try {

            // 点击取消
            if (!res.confirm) return

            // 获取订单ID
            const id = e.currentTarget.dataset.id

            // 显示加载
            wx.showLoading({
              mask: true
            })

            // 发送请求
            const result = await ORDER_SERVICE.delete(id)

            // 显示提示
            wx.showModal({
              content: result.msg,
              showCancel: false
            })

            // 初始化数据
            this.init()
          } catch (e) {

            // 显示提示
            wx.showModal({
              content: e.message,
              showCancel: false
            })
          } finally {

            // 隐藏加载
            wx.hideLoading()
          }
        }
      })
    },

    /**
     * 确认订单
     */
    putOrder(e) {

      wx.showModal({
        content: '是否确认收货',
        success: async res => {

          try {

            // 点击取消
            if (!res.confirm) return

            // 获取订单ID
            const id = e.currentTarget.dataset.id

            // 显示加载
            wx.showLoading({
              mask: true
            })

            // 发送请求
            const result = await ORDER_SERVICE.put(id)

            // 显示提示
            wx.showModal({
              content: result.msg,
              showCancel: false
            })

            // 初始化数据
            this.init()
          } catch (e) {

            // 显示提示
            wx.showModal({
              content: e.message,
              showCancel: false
            })
          } finally {

            // 隐藏加载
            wx.hideLoading()
          }
        }
      })
    },

    /**
     * 继续支付
     */
    async payOrder(e) {

      try {

        // 显示提示
        wx.showLoading({
          mask: true
        })

        // 获取参数
        const
          id = e.currentTarget.dataset.id,
          miniapp_openid = wx.getStorageSync('userInfo').miniapp_openid

        // 发送请求
        const pay = await ORDER_CONFIRM_SERVICE.order(id, miniapp_openid)

        // 拉起支付
        await UTIL.requestPayment(pay.data)

        // 提示
        wx.showModal({
          content: '支付成功',
          showCancel: false,
          success: () => this.init()
        })
      } catch (e) {

        // 判断错误
        if (e.message == 'requestPayment:fail cancel') return

        // 显示提示
        wx.showModal({
          content: e.message,
          showCancel: false
        })
      } finally {

        // 隐藏提示
        wx.hideLoading()
      }
    },

    /**
     * 添加评论
     */
    postComment(e) {

      // 获取元素
      const item = this.data.list[e.currentTarget.dataset.index]

      wx.navigateTo({
        url: `/pages/post-comment/post-comment?goodsId=${item.goods_id}&orderId=${item.id}&cover=${item.goods[0].thumb}`,
      })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    async onReachBottom() {}
  }
})