/*eslint-disable */
const app = getApp();

const AV = require('../../../lib/av-weapp-min.js');

Page({
	data: {
		imgSrc: '../../img/',
	},
	getAnswer() {
		var answerQuery = new AV.Query('Answer');

		answerQuery.equalTo('objectId', this.data.id);

		answerQuery.find().then(res => {
			console.log(res);
			this.setData({
				answer: res[0],
			});
		});
	},
	onLoad(options) {
		this.setData({
			id: options.id
		});
	},
	onReady() {

	},
	onShow() {
		this.getAnswer();
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