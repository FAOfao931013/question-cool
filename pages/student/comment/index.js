/*eslint-disable */
import Answer from '../../../model/answer.js';

const AV = require('../../../lib/av-weapp-min.js');

const app = getApp();

Page({
	data: {
		imgSrc: '../../../img/',
		id: '',
		question: {},
		answer: {},
		comment: {}
	},
	//预览答题照片
	previewImage(e) {
		return app.previewImage({
			current: e.currentTarget.id,
			urls: [e.currentTarget.id]
		})
	},
	//获取当前回答
	getAnswer(id) {
		const queryOne = new AV.Query('Answer');
		const queryTwo = new AV.Query('Answer');

		queryOne.equalTo('username', app.globalData.user.username);

		queryTwo.equalTo('questionId', id);

		const answerQuery = AV.Query.and(queryOne, queryTwo);

		answerQuery.find().then(res => {
			this.setData({
				answer: res[0].attributes,
			});
		});
	},
	//获取当前问题
	getQuestion(id) {
		const question = new AV.Query('Question');

		question.equalTo('objectId', id);

		question.find().then(res => {
			this.setData({
				question: res[0].attributes
			});
		});
	},
	//获取反馈
	getComment() {
		const {
			id,
		} = this.data;

		const queryOne = new AV.Query('Comment');
		const queryTwo = new AV.Query('Comment');

		queryOne.equalTo('username', app.globalData.user.username);

		queryTwo.equalTo('questionId', id);

		const commentQuery = AV.Query.and(queryOne, queryTwo);

		this.getQuestion(id);

		this.getAnswer(id);

		commentQuery.find().then(res => {
			this.setData({
				comment: res[0].attributes,
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
		this.getComment();
	},
	onHide() {

	},
	onUnload() {

	},
	onPullDownRefresh() {
		this.getComment().then(() => {
            wx.stopPullDownRefresh();
        });
	},
	onReachBottom() {

	},
})