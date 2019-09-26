/**
 * 购物车
 * 陈浩
 * 2019/4/19
 */
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Object,
    }, // 商品信息
  },

  /**
   * 数据监听
   */
  observers: {
    goods(goods) {

      if (goods.specs){

        const { count, specs } = this.data

        // 设置价格
        this.setData({
          // price: (count * goods.specs[specs].price).toFixed()
          price: (count * goods.money).toFixed()
        })
      }
    },
    /**
     * 监听统计和规格
     */
    'count, specs' (count, specs) {

      const { goods } = this.data
    
      // const price = (count * goods.specs[specs].price).toFixed()
      const price = (count * goods.money).toFixed()

      // 设置价格
      this.setData({ price })

      // 弹出改变
      this.triggerEvent('change', {
        count,
        specs,
        price
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hidden: true,
    specs: 0, // 规格
    count: 1, // 统计
    price: 0, // 价格
    login:'', //uid
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 打开
     */
    open() {
      var a = wx.getStorageSync('userInfo').id
      console.log(a)
      this.setData({
        hidden: false,
        login: a 
      })
    },

    /**
     * 关闭
     */
    close() {
      this.setData({
        hidden: true
      })
    },

    /**
     * 统计更改
     */
    countChange(e) {

      const count = e.detail.value

      // 设置统计
      this.setData({ count })

      // 弹出统计
      this.triggerEvent('count', { value: count })
    },

    /**
     * 规格选择
     */
    specsChoice(e) {

      const specs = e.detail.value
      
      // 设置规格
      this.setData({ specs })

      // 弹出规格
      this.triggerEvent('specs', { value: specs })
    },
    
    /**
     * 提交
     */
    submit(e) {

      // 弹出提交
      this.triggerEvent('submit', {
        ...e.detail.value
      })
    },
    /**
     * 结算2
     */
    toastSth(){
     if(this.data.list == null) {
       wx.navigateTo({
         url: '/pages/login/login',
       })
     }
      // wx.showModal({
      //   content: '积分不充足。不可兑换商品',
      //   showCancel:false
      // })
    }
  },
})