/*eslint-disable */
import wxp from '../../utils/wxpApi.js';

const AV = require('../../lib/av-weapp-min.js');

const app = getApp();

Page({
	data: {
		id: '',
		question: '',
	},
	getQuestion() {
		const {
			id
		} = this.data;

		const question = new AV.Query('Question');

		question.equalTo('objectId', id).find().then(res => {
			console.log(res[0]);
			this.setData({
				question: res[0].attributes.question.question
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
		this.getQuestion();
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