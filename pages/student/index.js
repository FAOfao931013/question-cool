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
		const question = new AV.Query('Question');

		question.find().then(res => {
			console.log(res);
			this.setData({
				questionArr: res.map(item => ({
					id: item.id,
					question: item.attributes.question.question
				})),
			});
		});
	},
	onLoad(options) {

	},
	onReady() {

	},
	onShow() {
		this.getQuestion();
		app.getCurrentUser().then(res => {
			app.globalData.user = res;
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