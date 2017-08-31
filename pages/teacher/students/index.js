/*eslint-disable */
const app = getApp();

const AV = require('../../../lib/av-weapp-min.js');

Page({
	data: {
		imgSrc: '../../../img/',
		students: [],
		id: '',
	},
	getStudents() {
		var answerQuery = new AV.Query('Answer');

		answerQuery.equalTo('questionId', this.data.id);

		answerQuery.find().then(res => {
			this.setData({
				students: res.map(item => ({
					username: item.attributes.username,
					name: item.attributes.name,
					id: item.id,
				})),
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