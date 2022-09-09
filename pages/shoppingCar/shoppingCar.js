// pages/shoppingCar/shoppingCar.js
Page({

  data: {
    isAddress:false,
    addressInfo:{},
    isCar:false,
    carList:[]
  },
  onLoad(){
    this.getAddressInfo()
    this.showCar()
  },
  getAddress(){
    wx.chooseAddress({
      success: (result) => {
        var obj = {
          userName:result.userName,
          telNumber:result.telNumber,
          detail:result.provinceName + result.cityName + result.countyName + result.detailInfo
        }
        this.setData({
          addressInfo:obj,
          isAddress:true
        })
        wx.setStorageSync('address', obj)
      },
    })
  },
  getAddressInfo(){
    var info = wx.getStorageSync('address')
    if(info){
      this.setData({
        isAddress:true,
        addressInfo:info
      })
    }
  },
  showCar(){
    var carList = wx.getStorageSync('carList')
    this.setData({
      carList,
      isCar:true
    })
  }
})