let classData = require('../../data/categoryData.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: [
      { 'id': 1, 'name': '数码' },
      { 'id': 2, 'name': '服装' },
      { 'id': 3, 'name': '玩具' },
      { 'id': 4, 'name': '眼镜' }
    ],
    curIndex: 0,
    productList: [],
    productAll: []
  },

  getProductAll () {
    let list = classData.data.productAll.filter(item => {
      return item.classId == 1;
    })
    this.setData({
      productAll: classData.data.productAll,
      productList: list
    })
  },

  chooseType (e) {
    let id = e.currentTarget.id;
    let list = [];
    let p = this.data.productAll;
    let len = p.length;
    for (let i = 0; i < len; i++) {
      if (p[i].classId == id) {
        list.push(p[i]);
      }
    }
    this.setData({
      productList: list,
      curIndex: id - 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductAll();
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