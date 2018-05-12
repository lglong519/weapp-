// pages/page-1/page-1.js
const PageSwiper = require('../../utils/PageSwiper');
const swiper = PageSwiper({
	prev: '/pages/page-3/page-3',
	next: '/pages/page-2/page-2',
	type: 'switchTab'
});
Page(Object.assign(swiper, {

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad (options) {
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow () {
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage () {

	}
}));
