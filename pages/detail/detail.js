// pages/detail/detail.js
const res =require("../../request/index")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gid:"",
    detailList:{},
    isLove:false,
    number:10
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
    this.showCarNum()
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

  addShop(){
    wx.showToast({
      title: '成功加入购物车',
    })
    var detailList=this.data.detailList
    var obj={
      num:null,
      img:detailList.goods_small_logo,
      price:detailList.goods_price,
      name:detailList.goods_name,
      gid:detailList.goods_id
    }
    var car = wx.getStorageSync('carList')
    if(car){
      var isData = false
      for(var i = 0; i<car.length;i++){
        if(car[i].gid == this.data.detailList.goods_id){
          var num = car[i].num+1
          obj.num = num
          car.splice(i,1)
          car.unshift(obj)
          wx.setStorageSync('carList', car)
          isData = true
        }
      }
      if(!isData){
        obj.num = 1
        car.unshift(obj)
        wx.setStorageSync('carList', car)
      }
    }else{
      var carList = []
      obj.num = 1
      carList.unshift(obj)
      wx.setStorageSync('carList', carList)
    }
    this.showCarNum()
  },

  showCarNum(){
    var car = wx.getStorageSync('carList') || []
    var allNum = 0
    for(var i = 0; i<car.length;i++){
      allNum +=car[i].num
    }
    this.setData({
      number:allNum
    })
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