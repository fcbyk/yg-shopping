// pages/proList/proList.js
const res = require("../../request/index")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList:[
        {
          id:1,
          name:'综合'
        },
        {
          id:2,
          name:'销量'
        }
    ],
    tabIndex:0,
    cid:null,
    pagenum:1,
    pagesize:10,
    query:null,
    goodsList:[],
    total:0,
    goodsRightList:[]
  },

  toggleTab(e){
    var index=e.currentTarget.dataset.index
    if(index==this.data.tabIndex){
      return
    }
    this.setData({
      tabIndex:index
    })
    if(index==1){
      this.sort()
    }
  },
  sort(){
    console.log("123")
    var goodsList=this.data.goodsList
    var temp
    for(var i=0;i<goodsList.length;i++){
      for(var j=i;j>0;j--){
        if(goodsList[j]["goods_price"]<goodsList[j-1]["goods_price"]){
          temp=goodsList[j];
          goodsList[j]=goodsList[j-1];
          goodsList[j-1]=temp
        }else{
          break
        }
      }
      this.setData({
        goodsRightList:goodsList
      })
    }
  },
  getProList(obj){
      res.request({
        url:"/goods/search",
        data:obj
      }).then(res=>{
        this.setData({
          goodsList:this.data.goodsList.concat(res.data.message.goods),
          total:res.data.message.total
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      cid:options.cid || "",
      query:options.query || ""
    })
    this.getProList({
      query:this.data.query,
      cid:this.data.cid,
      pagenum:this.data.pagenum,
      pagesize:this.data.pagesize
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
    if(this.data.tabIndex==1){
      return
    }
    var num=Math.ceil(this.data.total/this.data.pagesize)
    if(this.data.pagenum>=num){
      wx.showToast({
        title: "别划啦了，没了",
        icon:"none"
      })
      return
    }
    this.setData({
      pagenum:this.data.pagenum+1
    })
    this.getProList({
      query:this.data.query,
      cid:this.data.cid,
      pagenum:this.data.pagenum,
      pagesize:this.data.pagesize
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})