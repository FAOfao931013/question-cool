/*eslint-disable */
import Answer from '../../../model/answer.js';

const AV = require('../../../lib/av-weapp-min.js');

const app = getApp();

Page({
	data: {
		imgSrc: '../../../img/',
		id: '',
		question: '',
		type: '',
		answer: '',
		asImg: ''
	},
	//删除答题照片
	delAsImg() {
		this.setData({
			asImg: ''
		});
	},
	//预览答题照片
	previewImage(e) {
		return app.previewImage({
			current: e.currentTarget.id,
			urls: [e.currentTarget.id]
		})
	},
	//选择题目照片
	chooseImage() {
		app.chooseImage({
			count: 1
		}).then(res => {
			this.setData({
				asImg: res.tempFilePaths[0]
			});
		});
	},
	//新增答案
	addAnswer(answer, type) {
		const {
			id,
			imgSrc
		} = this.data;

		return new Answer({
			answer,
			username: app.globalData.user.username,
			type,
			questionId: id,
			name: app.globalData.user.name,
		}).save();
	},
	//更新答案
	updateAnswer(answer, type, id) {
		const answerObj = AV.Object.createWithoutData('Answer', id);

		app.showModal({
			title: '修改答案',
			content: '是否要修改当前问题的答案',
			confirmText: '确认修改'
		}).then(res => {
			if (res.confirm) {
				answerObj.set('answer', answer);
				answerObj.set('type', type);

				return answerObj.save();
			}
		});


	},
	//答案处理函数
	answerHandler(answer, type) {
		const {
			id,
			imgSrc
		} = this.data;

		const answerQuery = new AV.Query('Answer');

		answerQuery.equalTo('username', app.globalData.user.username);

		answerQuery.equalTo('questionId', id);

		answerQuery.find().then(res => {
			if (res.length > 0) {
				return this.updateAnswer(answer, type, res[0].id).then(res => {
					app.showToast('success', '答案修改成功', imgSrc);
				});
			} else {
				return this.addAnswer(answer, type).then(res => {
					app.showToast('success', '答案上传成功', imgSrc);
				});
			}
		});
	},
	//上传文字回答
	upAnswer(e) {
		const {
			imgSrc
		} = this.data;

		const {
			answer
		} = e.detail.value;

		if (answer == '') {
			app.showToast('fail', '请输入答案', imgSrc);
			return;
		}

		this.answerHandler(answer, 'text');
	},
	//上传图片题目
	uploadAsImg() {
		const {
			asImg,
			id,
			imgSrc,
		} = this.data;

		if (asImg == '') {
			app.showToast('fail', '请选择答题图片', imgSrc);
			return;
		}

		const name = asImg.split('//')[asImg.split('//').length - 1];

		app.uploadImgFile(name, asImg).then(url => {
			this.answerHandler(url, 'image');
		});
	},
	//获取问题详情
	getQuestion() {
		const {
			id
		} = this.data;

		const question = new AV.Query('Question');

		question.equalTo('objectId', id).find().then(res => {
			this.setData({
				question: res[0].attributes.question,
				type: res[0].attributes.type
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