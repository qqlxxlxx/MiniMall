Page({
  /**
   * 页面的初始数据
   */
  data: {
    productList: [],
    price: 0,
    isCheckAll: false
  },

  getProduct () {
    try {
      let storeValue = wx.getStorageSync('productList');
      if (storeValue) {
        this.setData({
          productList: storeValue
        })
      }
    } catch (e) {}
  },

  switchCheck (e) {
    let priceSum = 0;
    let value = e.detail.value[0];
    let curId = e.currentTarget.id;
    let p = this.data.productList;
    let len = p.length;
    if (value) {
      for (let i = 0; i < len; i++) {
        if (p[i].id == curId) {
          priceSum = this.data.price + p[i].price * p[i].count.quantity;
          p[i].isCheck = true;
        }
      }
    } else {
      for (let i = 0; i < len; i++) {
        if (p[i].id == curId) { 
          priceSum = this.data.price - p[i].price * p[i].count.quantity;
          p[i].isCheck = false;
        }
      }
    }
    let check = p.find(item => {
      return item.isCheck == false;
    })
    this.setData({
      productList: p,
      price: priceSum,
      isCheckAll: !check
    })
  },

  checkAll (e) {
    let priceSum = 0;
    let value = e.detail.value[0];
    let p = this.data.productList;
    let len = p.length;
    if (value) {
      for (let i = 0; i < len; i++) {
        p[i].isCheck = true;
        priceSum += p[i].price * p[i].count.quantity;
      }
    } else {
      for (let i = 0; i < len; i++) {
        p[i].isCheck = false;
        priceSum = 0;
      }
    }
    this.setData({
      productList: p,
      price: priceSum
    })
  },

  dec (e) {
    let quantity = e.target.dataset.quantity - 1;
    let i = parseInt(e.currentTarget.id);
    if (quantity <= 0) {
      this.data.productList.splice(i, 1);
      let list = this.data.productList;
      this.setData({
        productList: list
      });
      wx.setStorageSync('productList', list);
      return;
    }
    let up = 'productList[' + i + '].count.quantity';
    this.setData({ 
      [up]: quantity
    });
    wx.setStorageSync('productList', this.data.productList);
    if (this.data.productList[i].isCheck) {
      let priceSum = 0;
      priceSum = this.data.price - this.data.productList[i].price;
      this.setData({
        price: priceSum
      });
    }
  },

  add (e) {
    let quantity = e.target.dataset.quantity + 1;
    if (quantity > 20 || quantity <= 0) return;
    let i = parseInt(e.currentTarget.id);
    let up = 'productList['+ i +'].count.quantity';
    this.setData({ 
      [up]: quantity
    });
    wx.setStorageSync('productList', this.data.productList);
    if (this.data.productList[i].isCheck) {
      let priceSum = 0;
      priceSum = this.data.price + this.data.productList[i].price;
      this.setData({
        price: priceSum
      });
    }
  },

  goBuy () {
    let list = this.data.productList.filter(item => {
      return item.isCheck == false;
    })
    this.setData({
      productList: list,
      price: 0
    });
    wx.setStorageSync('productList', list);
  },

  leave () {
    if (this.data.productList.length == 0) return;
    this.data.productList.forEach(item => {
      item.isCheck = false
    })
    wx.setStorageSync('productList', this.data.productList);
    this.setData({
      isCheckAll: false,
      price: 0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.getProduct();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.leave()
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