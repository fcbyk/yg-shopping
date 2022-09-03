// pages/cate/cate.js
const res = require("../../request/index")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories:[],
    cateRightList:[],
    leftIndex:0,
    leftTop:0,
    rightTop:0
  },

  getCategories(num){
    res.request({
      url:"/categories"
    }).then( result => {
      this.setData({
        categories:result.data.message,
        cateRightList:result.data.message[num].children
      })
      // console.log(result.data.message)
    })
  },

  toggleLeft(e){
    const index= e.currentTarget.dataset.index
    console.log(index)
    this.setData({
      leftIndex:index,
      leftTop: (index - 5)*60,
      rightTop:0
    })
    this.getCategories(index)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCategories(0)
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