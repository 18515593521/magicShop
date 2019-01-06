//页面js
var app = getApp();   //获取应用实例

Page({
  data: {
      headImage: "about:blank",        //用户图像
      nickName: "",         //昵称

      isNeedPay: 2,             //是否需要支付（1：显示；2：关闭；）
    listData:[
      { name: '我的订单', class:'my_order', url: '/pages/person_center/my_order/my_order', icon:'/images/menu/order.png'},
      { name: '我的活动', class: 'my_activity',  url: '/pages/person_center/my_activity/my_activity', icon: '/images/menu/activity.png' },
      { name: '我的拼团', class: 'group_list', url: 'pages/group/group_list/group_list', icon: '/images/menu/group.png' },
      { name: '我的卡券', class: 'my_card', url: '/pages/person_center/my_card/customer_card_list', icon: '/images/menu/coupons.png' },
      { name: '我的足迹', class: 'foot', url: '', icon: '/images/menu/foot.png' },
      { name: '我的推广', class: 'extension', url: '/pages/person_center/extension/extension', icon: '/images/menu/extension.png' },
      { name: '专属顾问', class: 'adviser', url: '/pages/person_center/adviser/adviser', icon: '/images/menu/adviser.png' },
      { name: '我的专属码', class: 'invite', url: '/pages/person_center/invite/invite', icon: '/images/menu/code.png' }
    ],
    listData2:[
      { name: '爆款预定', class: 'booking_list',url:'/pages/person_center/booking/booking_list/booking_list',icon:'/images/menu/hot.png'},
      { name: '收货地址', class: 'address_list',url:'/pages/person_center/address/address_list/address_list',icon:'/images/menu/address.png' }
    ],
    listData3:[
      { name: '返回首页', class: 'index', url: '/pages/index/index', icon:'/images/menu/index.png' }
    ]
  },

  //页面加载
  onLoad: function (options) { 
    var avatarUrl = wx.getStorageSync('avatarUrl');
    var userInfo = app.globalData.userInfo;     //微信用户信息
    this.setData({
      headImage: userInfo.avatarUrl ? userInfo.avatarUrl : avatarUrl,
      nickName: userInfo.nickName ? userInfo.nickName:'180911'
    });
  },
  //页面显示
  onShow: function () { 
    this.isHavePayOrder();  //是否有需要支付的订单
  },

  //页面跳转
  pageSkip: function (e) {
    var thisPage = this;
    var dataSet = e.currentTarget.dataset;
    var skipUrl = dataSet.url;
    var skipType = dataSet.type;
    var isCheck = dataSet.check;

    // if (isCheck == 1 || isCheck == 2) { 
    //   if (!app.globalData.customerInfo.name) {    //未注册
    //     app.pageSkip("/pages/user_validate/user_validate", 1);
    //     return;
    //   }
    // }
    if (!app.globalData.customerInfo.guiderId) {  //无专属导购
      thisPage.getAdviserInfo(skipUrl, skipType);    //获取顾问信息
      return;
    }

    app.pageSkip(skipUrl, skipType);
  },
  //获取顾问信息
  getAdviserInfo: function (skipUrl, skipType) {
    var thisPage = this;

    wx.request({
      url: app.globalData.domainName + '/app/exclusiveConsultant',  //接口地址
      data: {
        customer_id: app.globalData.customerInfo.id
      },
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {  //成功
        var returnData = res.data;

        if (returnData.code == 0 && returnData.result.id) { //成功
          app.globalData.customerInfo.guiderId = returnData.result.id;
          app.pageSkip(skipUrl, skipType);
        } else {  //失败
          app.showWarnMessage("您还没有导购");
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
  //是否有需要支付的订单
  isHavePayOrder: function () {
    var thisPage = this;

    wx.request({
      url: app.globalData.domainName + '/app/isShowRed/' + app.globalData.customerInfo.id,  //接口地址
      method: 'GET',
      dataType: 'json',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {  //成功
        var returnData = res.data;

        if (returnData.code == 0) { //成功
          thisPage.setData({
            isNeedPay: returnData.result.isShowRed
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

  

})
