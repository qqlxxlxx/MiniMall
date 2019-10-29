// pages/index/index.js
let indexData = require('../../data/indexData.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navList: [],
    productList: [],
    loadCount: 0,
    top: 0,
    showBackTop: false
  },

  getNavList () {
    let that = this;
    wx.request({
      url: 'http://www.hengyishun.cn/login/navList',
      success (res) {
        that.setData({
          navList: res.data
        })
      }
    })
  },

  handleImgLoad (e) {
    if (this.data.loadCount == 8) {
      let that = this;
      wx.createSelectorQuery().select('.hot').boundingClientRect(rect => {
        that.data.top = rect.top;
      }).exec()
    }
    this.data.loadCount += 1;
  },

  backTop () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 150
    })
  },

  getProductList () {
    this.setData({
      productList: indexData.data.productList
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNavList();
    this.getProductList();
    this.handleImgLoad();
  },

  /**
   * 监听页面滚动
   */
  onPageScroll (e) {
    let scrollTop = e.scrollTop;
    let flag = scrollTop >= this.data.top;
    if (flag != this.data.showBackTop) {
      this.setData({
        showBackTop: flag,
        isTabFixed: flag
      })
    }
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