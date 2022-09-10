// pages/search/search.js

const res = require("../../request/index")

Page({
  data: {
    isSearch:true,
    searchList:[],
    isSearchNoData:false,
    value:''
  },

  timer:1,

  inputChange(e){
    var value=e.detail.value.trim()
    if(value==""){
      this.setData({
        searchList:[],
        isSearch:false
      })
      return
    }
    clearTimeout(this.timer)
    this.timer = setTimeout(()=>{
      this.getData(value)
    },1000)
    
  },
  getData(query){
    res.request({
      url:'/goods/qsearch',
      data:{
        query
      }
    }).then(res=>{
      if(res.data.message.length==0){
        this.setData({
          isSearchNoData:true
        })
      }else{
        this.setData({
          isSearchNoData:false
        })
      }
      this.setData({
        searchList:res.data.message,
        isSearch:true
      })
    })
  },
  clearAll(){
    this.setData({
      isSearch:true,
      searchList:[],
      value:''
    })
  }
})