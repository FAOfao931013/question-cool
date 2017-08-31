/*eslint-disable */
const app = getApp();

const AV = require('../../../lib/av-weapp-min.js');

Page({
	data: {
		imgSrc: '../../img/',
	},
	//预览答题照片
	previewImage(e) {
		return app.previewImage({
			current: e.currentTarget.id,
			urls: [e.currentTarget.id]
		})
	},
	//获取答案
	getAnswer() {
		var answerQuery = new AV.Query('Answer');

		answerQuery.equalTo('objectId', this.data.id);

		answerQuery.find().then(res => {
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