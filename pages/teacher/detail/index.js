/*eslint-disable */
import Comment from '../../../model/comment.js';

const app = getApp();

const AV = require('../../../lib/av-weapp-min.js');

Page({
	data: {
		imgSrc: '../../img/',
		answer: {},
		checkItems: [{
			value: '正确',
			checked: true,
		}, {
			value: '错误',
			checked: false,
		}],
		result: '正确'
	},
	//更新评论
	updateComment(result, comment, type, id) {
		const commentObj = AV.Object.createWithoutData('Comment', id);

		commentObj.set('result', result);
		commentObj.set('comment', comment);
		commentObj.set('type', type);

		return commentObj.save();
	},
	//新增评论
	addComment(result, comment, type) {
		const {
			imgSrc,
			answer
		} = this.data;

		return new Comment({
			result,
			comment,
			type,
			name: answer.attributes.name,
			username: answer.attributes.username,
			answerId: answer.id,
			questionId: answer.attributes.questionId,
		}).save();
	},
	//上传评论反馈
	upComment(e) {
		const {
			imgSrc,
			answer,
			result,
		} = this.data;

		const {
			comment
		} = e.detail.value;

		const queryOne = new AV.Query('Comment');
		const queryTwo = new AV.Query('Comment');

		queryOne.equalTo('username', answer.attributes.username);

		queryTwo.equalTo('answerId', answer.id);

		var commentQuery = AV.Query.and(queryOne, queryTwo);

		commentQuery.find().then(res => {
			if (res.length > 0) {
				return this.updateComment(result, comment, 'text', res[0].id).then(res => {
					app.showToast('success', '评论成功', imgSrc);
				});
			} else {
				return this.addComment(result, comment, 'text').then(res => {
					app.showToast('success', '评论成功', imgSrc);
				});
			}
		});
	},
	//修改正确错误
	changeItems(e) {
		const {
			checkItems
		} = this.data;

		checkItems.forEach(item => {
			item.checked = item.value == e.detail.value;
		});

		this.setData({
			result: checkItems.filter(item => item.checked)[0].value,
			checkItems,
		});
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
		this.getAnswer().then(() => {
            wx.stopPullDownRefresh();
        });
	},
	onReachBottom() {

	},
})