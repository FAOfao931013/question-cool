/*eslint-disable */
import wxp from '../../utils/wxpApi.js';

const AV = require('../../lib/av-weapp-min.js');

const app = getApp();

Page({
	data: {

	},
	gotoReset() {
		app.navigateTo('/pages/reset/index');
	},
	logOut() {
		app.logOut();
	},
	getQuestion() {
		var question = new AV.Query('Question');

		question.find().then(res => {
			this.setData({
				questionArr: res.map(item => item.attributes.question.question),
			});
		});
	},
	onLoad(options) {
		this.getQuestion();
	},
	onReady() {

	},
	onShow() {
		app.getCurrentUser().then(res => {
			this.setData({
				user: res,
			});
		});
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