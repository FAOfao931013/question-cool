/*eslint-disable */
const app = getApp();

const AV = require('../../../lib/av-weapp-min.js');

Page({
	data: {
		imgSrc: '../../../img/',
		students: [],
	},
	getStudents() {
		var query = new AV.Query('Users');

		query.find().then(res => {
			this.setData({
				students: res.filter(item => item.attributes.type == 'student')
			});
		});
	},
	onLoad(options) {

	},
	onReady() {

	},
	onShow() {
		this.getStudents();
	},
	onHide() {

	},
	onUnload() {

	},
	onPullDownRefresh() {

	},
	onReachBottom() {

	},
})