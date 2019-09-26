const
  AUTH = require('../../utils/auth'),
  SHARE_SERVICE = require('../../service/share.service')
let PAGE = 1
/**
 * 分享列表
 * 陈浩
 * 2019/4/30
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categoryId: {
      type: String,
    } // 列表
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [], // 列表
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 清空
     */
    clear() {

      // 判断是否为空
      if (this.data.list.length <= 0) return

      // 清空
      this.setData({
        list: []
      })
    },

    /**
     * 初始化数据
     */
    async init() {

      // 获取容器
      const container = this.selectComponent('.container')

      try {

        // 获取分类ID、页号
        const categoryId = this.data.categoryId
        PAGE = 1

        // 设置状态为初始化
        container.status('init')

        // 获取列表
        const result = await SHARE_SERVICE.list(categoryId, PAGE)

        // 设置数据
        this.setData({
          list: result.data.list
        })

        // 弹出横幅数据
        this.triggerEvent('banner', {
          value: result.data.url
        })

        // 设置状态为下拉或完成
        container.status(result.data.list.length > 0 ? 'canload' : 'complete')
      } catch (e) {

        // 设置状态为错误
        container.status('error', e.message)
      }
    },

    /**
     * 页面相关事件处理函数
     */
    async onPullDownRefresh() {

      // 初始化数据
      await this.init()

      // 停止下拉
      this.selectComponent('.custom-scroll').stopPullDownRefresh()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    async onReachBottom() {

      // 获取容器
      const container = this.selectComponent('.container')

      try {

        if (container.status() != 'canload') return

        // 获取列表、分类ID、分页
        const
          categoryId = this.data.categoryId,
          list = this.data.list

        // 设置状态为加载中
        container.status('loading')

        // 获取列表
        const result = await SHARE_SERVICE.list(categoryId, PAGE + 1)

        // 设置页号
        PAGE += 1

        // 设置数据
        this.setData({
          list: list.concat(result.data.list)
        })

        // 弹出横幅数据
        this.triggerEvent('banner', {
          value: result.data.url
        })

        // 设置状态为下拉或完成
        container.status(result.data.list.length > 0 ? 'canload' : 'complete')
      } catch (e) {

        // 设置状态为错误
        container.status('error', e.message)
      }
    },

    /**
     * 下载图片
     */
    async saveImage(e) {

      try {

        // 获取下标
        const index = e.currentTarget.dataset.index

        // 获取图片信息
        const imageList = this.data.list[index].share_images

        // 获取权限
        const result = await AUTH.getAuth('writePhotosAlbum')

        // 没有权限
        if (result.code == 1 || result.code == 3) throw new Error('auth:fail')

        // 循环保存
        imageList.forEach(async(item) => {

          // 获取文件路径
          const filePath = await UTIL.downloadFile(item)

          // 保存文件
          await UTIL.saveImageToPhotosAlbum(filePath)
        })
      } catch (e) {

        if (e.message == 'auth:fail') {

          // 提示
          wx.showModal({
            content: '未授权下载权限',
            confirmText: '授权',
            success: res => res.confirm ? wx.openSetting() : void (0),
          })
        }
        else {

          // 提示
          wx.showModal({
            content: e.message,
            showCancel: false,
          })
        }
      }
    },

    /**
     * 复制内容
     */
    copyContent(e) {

      // 获取下标
      const index = e.currentTarget.dataset.index

      // 获取列表
      const list = this.data.list

      // 设置剪贴板
      wx.setClipboardData({
        data: list[index].share_content
      })
    }
  }
})