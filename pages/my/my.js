// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oneList:[
      {
        id:1,
        num:0,
        name:"收藏的店铺"
      },
      {
        id:2,
        num:0,
        name:"收藏的商品"
      },
      {
        id:3,
        num:0,
        name:"关注的商品"
      },
      {
        id:4,
        num:0,
        name:"我的足迹"
      }
    ],
    twoList:[
      {
        id:1,
        img_src: "../../image/全部订单.svg",
        name:"全部订单"
      },
      {
        id:2,
        img_src:"../../image/待付款.svg",
        name:"待付款"
      },
      {
        id:3,
        img_src:"../../image/待收货.svg",
        name:"待收货"
      },
      {
        id:4,
        img_src:"../../image/退款.svg",
        name:"退货/退款"
      }
    ],
    threeList:[
      {
        id:1,
        name:'联系客服'
      },
      {
        id:2,
        name:'意见反馈'
      },
      {
        id:3,
        name:'关于我们'
      },
      {
        id:4,
        name:'设置'
      },
    ],
    isLogin:false,
    userInfo:{}
  },
  goLogin(e){
    wx.showToast({
      title: '成功登录',
    })
    var userInfo={
      avatarUrl:e.detail.userInfo.avatarUrl,
      nickName:e.detail.userInfo.nickName
    }
    this.setData({
      userInfo,
      isLogin:true
    })
    wx.setStorageSync('userinfo', userInfo)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var userInfo = wx.getStorageSync('userinfo')
    if(userInfo){
      this.setData({
        userInfo,
        isLogin:true
      })
    }
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
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})