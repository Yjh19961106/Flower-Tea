const OBSERVE = require('../utils/observe')
module.exports = {
  /**
   * 获取系统信息
   */
  get() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${getApp().globalData.url.host}/api/Miniapp/config_page`,
        success: result => {
          if (result.statusCode != 200) {
            reject(new Error('网络错误'))
          } else if (result.data.code == 1) {

            // 获取信息
            const color = result.data.data.find(item => item.name == 'color').value
            const title = result.data.data.find(item => item.name == 'name').value
            const logo = `${getApp().globalData.url.image}${result.data.data.find(item => item.name == 'icon').value}`

            // 设置系统信息
            wx.setTabBarStyle({
              selectedColor: color,
            })

            // 设置公共信息
            getApp().globalData.system.color = color
            getApp().globalData.system.logo = logo
            getApp().globalData.system.title = title

            // 推送设置
            OBSERVE.publish('system', result.data.data)

            // 返回数据
            resolve(result.data)
          } else {
            reject(new Error(result.data.msg))
          }
        },
        fail: result => {
          reject(new Error('网络错误'))
        }
      })
    })
  },
}