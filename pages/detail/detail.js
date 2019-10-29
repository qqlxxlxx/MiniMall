let detailData = require('../../data/detailData.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productInfo: {},
    isAdd: false
  },

  getProductInfo (id) {
    this.setData({
      productInfo: detailData.data.productInfo[id]
    })
  },

  getAdd (id) {
    try {
      let storeValue = wx.getStorageSync('productList') || [];
      let len = storeValue.length;
      let productIdList = [];
      let curId = parseInt(id);
      for (let i = 0; i < len; i++) {
        productIdList.push(storeValue[i].id);
      }
      if (productIdList.indexOf(curId) > -1) {
        this.setData({
          isAdd: true
        })
      } else {
        this.setData({
          isAdd: false
        })
      }
    } catch (e) { }
  },

  addCart (e) {
    // 将数据存储到本地
    try {
      let storeValue = wx.getStorageSync('productList') || [];
      let len = storeValue.length;
      let productIdList = [];
      let curId = parseInt(e.currentTarget.id);
      for (let i = 0; i < len; i++) {
        productIdList.push(storeValue[i].id);
      }
      if (productIdList.indexOf(curId) > -1) {
        wx.showToast({
          title: '已添加',
          icon: 'none',
          duration: 1500
        })
      } else {
        storeValue.unshift(this.data.productInfo);
        wx.setStorageSync('productList', storeValue);
        this.setData({
          isAdd: true
        })
        wx.showToast({
          title: '添加成功',
          duration: 1500
        })
      }
    } catch (e) { }
  },

  buy () {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this.getProductInfo(id);
    this.getAdd(id);
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