const
  UTIL = require('../../utils/util'),
  AUTH = require('../../utils/auth'),
  teamList = require('../../service/team.list.js')
let PAGE = 1
/**
 * 团队信息
 * 于家辉
 * 2019/9/25
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: {
      maxPage: 2 // 最大页数
    }, // 参数
    category: {
      list: [{
          id: '',
          title: '全部',
          count: 0,
          lv: 0
        },
        {
          id: '用户',
          title: '注册用户',
          count: 0,
          lv: 1
        },
        {
          id: 'vip',
          title: 'VIP店长',
          count: 0,
          lv: 2
        },
        {
          id: '银牌',
          title: '银牌店长',
          count: 0,
          lv: 3
        },
        {
          id: '金牌',
          title: '金牌店长',
          count: 0,
          lv: 4
        },
        {
          id: '钻石',
          title: '钻石店长',
          count: 0,
          lv: 5
        },
      ] // 列表
    }, // 分类
    goodsList: [],
    lv: 0 ,
  },
  // async getList (){
  //   // 初始化页号
  //   PAGE = 1
  //   try {
  //     // const result = await teamList.post(wx.getStorageSync('userInfo').id , 1 , 0)
  //     const result = await teamList.post(159, PAGE, this.data.lv)
  //     this.setData({
  //       'category.list[0].count': result.data.child_num0,
  //       'category.list[1].count': result.data.child_num1,
  //       'category.list[2].count': result.data.child_num2,
  //       'category.list[3].count': result.data.child_num3,
  //       'category.list[4].count': result.data.child_num4,
  //       'category.list[5].count': result.data.child_num5,
  //       goodsList: result.data.child.data
  //     })
  //     // 设置状态为下拉或完成
  //     container.status(result.data.child.current_page < result.data.child.last_page ? 'canload' : 'complete')

  //   } catch (e) {
  //     if (e.message == 'login:fail') {
  //       // 设置状态
  //     } else {
  //       // 设置状态
  //     }
  //   }
  // },
  async getLv(e) {
    console.log(e)
    this.setData({
      lv: e.currentTarget.dataset.lv
    })
    this.init()
  },

  /**
   * tab切换
   */
  tabChange(e) {

    // 初始化列表
    // this.selectAllComponents('.group-list')[e.detail.contentIndex].init(this.data.options.id)
  },

  /**
   * 初始化数据
   */
  async init() {
    // 初始化页号
    PAGE = 1
    try {
      // 验证登录
      await AUTH.loginStatus()

      // 设置状态
      // this.selectComponent('#container').status('default')
      const container = this.selectComponent('#container')
      // 初始化tab
      // this.selectComponent('#tab').init()
      // const result = await teamList.post(wx.getStorageSync('userInfo').id , 1 , 0)
      const result = await teamList.post(wx.getStorageSync('userInfo').id, PAGE, this.data.lv)
      this.setData({
        'category.list[0].count': result.data.child_num0,
        'category.list[1].count': result.data.child_num1,
        'category.list[2].count': result.data.child_num2,
        'category.list[3].count': result.data.child_num3,
        'category.list[4].count': result.data.child_num4,
        'category.list[5].count': result.data.child_num5,
        goodsList: result.data.child.data
      })
      // 设置状态为下拉或完成
      container.status(result.data.child.current_page < result.data.child.last_page ? 'canload' : 'complete')

    } catch (e) {
      if (e.message == 'login:fail') {
        // 设置状态
        // 跳转至授权页
        wx.redirectTo({
          url: getApp().globalData.pages.auth,
        })
      } else {
        // 设置状态
        container.status('error', e.message)
      }
    }
    // try {



    //   // 验证登录
    //   await AUTH.loginStatus()

    //   // 设置状态
    //   this.selectComponent('#container').status('default')

    //   // 初始化tab
    //   this.selectComponent('#tab').init()
    //   // const container = this.selectComponent('#container')

    //   this.getList();


    // } catch (e) {

    //   if (e.message == 'login:fail') {

    //     // 跳转至授权页
    //     wx.redirectTo({
    //       url: getApp().globalData.pages.auth,
    //     })
    //   } else {

    //     // 设置状态
    //     container.status('error', e.message)
    //   }
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // 获取参数
    this.setData({
      options: Object.assign({
        id: wx.getStorageSync('userInfo').id,
        nickname: wx.getStorageSync('userInfo').name
      }, this.data.options, options)
    })

    wx.setNavigationBarTitle({
      title: `${this.data.options.id == wx.getStorageSync('userInfo').id ? '我' : this.data.options.nickname}的团队`,
    })

    // 初始化数据
    this.init()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
  async onPullDownRefresh() {

    // 初始化数据
    await this.init()

    // 停止下拉
    wx.stopPullDownRefresh()
  },


  /**
    * 页面上拉触底事件的处理函数
    */
  async onReachBottom() {

    // 获取容器
    const container = this.selectComponent('#container')

    try {

      // 判断容器状态
      if (container.status() != 'canload') return

      // 获取列表
      const list = this.data.goodsList

      // 设置状态为加载中
      container.status('loading')

      // 获取数据

      // const result = await integralService.list(wx.getStorageSync('userInfo').id, PAGE + 1)
      // const result = await extractList.post(159, PAGE + 1)
      const result = await teamList.post(159, PAGE+1, this.data.lv)

      // 设置页号
      PAGE += 1

      // 设置数据
      this.setData({
        goodsList: list.concat(result.data.child.data)
      })

      // 设置状态为下拉或完成
      container.status(result.data.child.current_page < result.data.child.last_page ? 'canload' : 'complete')
    } catch (e) {

      // 设置状态为错误
      container.status('error', e.message)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

    // 返回分享
    return UTIL.share()
  }
})