// pages/member/detailRule/detailRule.js
var WxParse = require('../../../plugs/wxParse/wxParse.js');
var app = getApp();   //获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thisPage = this;
    // if (options.detail){
    //  var detail =  JSON.stringify(options.detail);
    //  WxParse.wxParse('details', 'html', detail, thisPage, 0);
    // }
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
        
          WxParse.wxParse('details', 'html', returnData.result.describe, thisPage, 0);
          // thisPage.setData({
          //   vipDatas: returnData.result,
          //   indexData: indexData
          // })

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})