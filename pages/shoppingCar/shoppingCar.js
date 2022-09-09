// pages/shoppingCar/shoppingCar.js
Page({

  data: {
    isAddress:false,
    addressInfo:{},
    isCar:false,
    carList:[],
    allChecked:false,
    allPrice:0,
    allNum:0
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
    var isActive= carList.every(v=>{return v.isActive})
    this.setData({
      carList,
      isCar:true,
      allChecked:isActive
    })
    this.calc()
    if (carList.length==0) {
      this.setData({
        isCar:false,
        allChecked:false
      })
    }
  },
  allChecked(){
    this.setData({
      allChecked:!this.data.allChecked
    })
    var car=wx.getStorageSync('carList')
    car.forEach(v=>{
      return v.isActive=this.data.allChecked
    })
    wx.setStorageSync('carList', car)
    this.showCar()
  },
  listChange(e){
    var index=e.currentTarget.dataset.index
    var car=wx.getStorageSync('carList')
    car[index].isActive=!car[index].isActive
    wx.setStorageSync('carList', car)
    this.showCar()
  },
  calc(){
    var car = wx.getStorageSync('carList')
    var allPrice=0
    var allNum=0
    car.forEach(v=>{
      if(v.isActive){
        allNum+=v.num,
        allPrice+=v.num*v.price
      }
    })
    this.setData({
      allPrice,
      allNum
    })
  },
  changeNum(e){
    var index = e.currentTarget.dataset.index;
    var num =Number(e.currentTarget.dataset.num)
    var car = wx.getStorageSync('carList')
    var number = car[index].num +num
    if(number == 0){
      wx.showModal({
        title:'提示',
        content:'真的忍心删除我吗',
        success:(res)=>{
          if (res.confirm){
            car.splice(index,1)
            wx.setStorageSync('carList', car)
            this.showCar()
          }else if (res.cancel) {
            wx.showToast({
              title: '就知道你舍不得我',
              icon:'none'
            }) 
          }
        }
      })
    }else{
      car[index].num =number
      wx.setStorageSync('carList', car)
      this.showCar()
    }
  }
})