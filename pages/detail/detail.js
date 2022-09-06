// pages/detail/detail.js
const res =require("../../request/index")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gid:"",
    detailList:{},
    isLove:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      gid:options.gid
    })
    this.getDetailList()

    var love=wx.getStorageSync('loveList')
    var isLove=love.some(v=>v.gid == this.data.gid)
    if(isLove){
      this.setData({
        isLove
      })
    }
  },

  getDetailList(){
    res.request({
      url:"/goods/detail",
      data:{
        goods_id:this.data.gid
      }
    }).then(res=>{
      this.setData({
        detailList:res.data.message
      })
    })
  },

  preImg(e){
    var index = e.currentTarget.dataset.index
    var pics = this.data.detailList.pics
    var urls=[]
    for(var i=0;i<pics.length;i++){
      urls.push(pics[i].pics_mid_url)
    }

    wx.previewImage({
      urls,
      current:urls[index]
    })
  },

  love(){
    var detailList = this.data.detailList
    var obj = {
      img:detailList.goods_small_logo,
      gid:detailList.goods_id,
      price:detailList.goods_price,
      name:detailList.goods_name
    }
    var love = wx.getStorageSync('loveList') || []

    if(!this.data.isLove){
      love.push(obj)
      wx.setStorageSync('loveList', love)
      this.setData({
        isLove:true
      })
    }else{
      var index = love.findIndex(v=>v.gid==this.data.gid)
      love.splice(index,1)
      wx.setStorageSync('loveList', love)
      this.setData({
        isLove:false
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