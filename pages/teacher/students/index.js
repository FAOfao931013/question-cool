/*eslint-disable */
const app = getApp();

const AV = require('../../../lib/av-weapp-min.js');

Page({
	data: {
		imgSrc: '../../../img/',
		students: [],
		id: '',
	},
	//获取评论
	getComment(students) {
		const {
			id,
		} = this.data;

		const commentQuery = new AV.Query('Comment');

		commentQuery.equalTo('questionId', id);

		commentQuery.find().then(res => {
			const comment = res.map(item => ({
				username: item.attributes.username,
				result: item.attributes.result,
			}));

			this.setData({
				students: students.map(item => {
					comment.forEach(_item => {
						if (_item.username == item.username) {
							item.isComment = true;
							item.result = _item.result;
						}
					})

					return item;
				})
			});
		});
	},
	//获取学生列表
	getStudents() {
		var answerQuery = new AV.Query('Answer');

		answerQuery.equalTo('questionId', this.data.id);

		answerQuery.ascending('username');

		answerQuery.find().then(res => {
			const students = res.map(item => ({
				username: item.attributes.username,
				name: item.attributes.name,
				id: item.id,
				isComment: false,
				result: '',
			}));

			this.getComment(students);
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
		this.getStudents().then(() => {
			wx.stopPullDownRefresh();
		});
	},
	onReachBottom() {

	},
})