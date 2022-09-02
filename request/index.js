export const request = obj => {
  // 定义一个公共的url
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve, reject) => {
      // 开启loading
      wx.showLoading({
          title: '努力加载中...',
      })
      wx.request({
          ...obj,
          url: baseUrl + obj.url,
          success: (res) => {
              resolve(res)
              // 关闭loading
              wx.hideLoading()
          },
          fail: (err) => {
              reject(err)
          }
      })
  })
}