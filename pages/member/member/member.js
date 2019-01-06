// pages/member/member.js
var app = getApp();   //获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipData:[],  // 所有的用户类型
    indexData:null,  //当前的类型
     vipData:[
       {name:'普通会员',level:'1'},
       { name: 'VIP会员', level: '2' },
       { name: 'SVIP会员', level: '3' },
     ],
     linesWidth:['line1','line2']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var thisPage = this;
    wx.request({
      url: app.globalData.domainName + '/app/selectCustomerVipInfo/ ' + app.globalData.customerInfo.id,  //接口地址
      method: 'post',
      dataType: 'json',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {  //成功
        var returnData = res.data;
      
        if (returnData.code == 0) { //成功
          var vipDatas = returnData.result.vipLevel;  //会员的所有数据
          for (var m = 0; m < vipDatas.length; m++) {  //遍历给加样式
            var level = parseInt(vipDatas[m].level);
            if (vipDatas.length / level == 1) {
              vipDatas[m].line = "line3";
            } else if (vipDatas.length / level == vipDatas.length) {
              vipDatas[m].line = "line1"
            } else {
              vipDatas[m].line = "line2"
            }
            if (level == returnData.result.vip_level ) {
              vipDatas[m].color = "colors";
            } else {
              vipDatas[m].color = "";
            }
            if (vipDatas[m].level == returnData.result.vip_level) { //找出当前的会员等级数据
              var indexData = vipDatas[m];
            } 
          }
    
          thisPage.setData({
            vipDatas: returnData.result,
            indexData: indexData
          })
         
        } else {  //失败
          app.showWarnMessage(returnData.message);
        }
      },
      fail: function (res) {     //失败
        console.log('请求失败：', res.errMsg);
      },
      complete: function (res) { //完成
        console.log('请求完成：', res.errMsg);
      }
    })

   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
//点击
  skinUp:function(e){
    var dataSet = e.currentTarget.dataset;
    var url = dataSet.url;
    var type = dataSet.types;
    app.pageSkip(url, type);
  }
})