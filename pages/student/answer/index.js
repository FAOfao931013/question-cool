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
	gotoReset() {
		app.navigateTo('/pages/reset/index');
	},
	logOut() {
		app.logOut();
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
			new Answer({
				answer: url,
				username: app.globalData.user.username,
				type: 'image',
				questionId: id,
				name: app.globalData.user.name
			}).save().then(res => {
				app.showToast('success', '答题图片上传成功' , imgSrc);
				this.delAsImg();
			});
		});
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
	//上传文字回答
	upAnswer(e) {
		const {
			id,
			imgSrc
		} = this.data;

		if (e.detail.value.answer == '') {
			app.showToast('fail', '请输入答案', imgSrc);
			return;
		}

		new Answer({
			answer: e.detail.value.answer,
			username: app.globalData.user.username,
			type: 'text',
			questionId: id,
			name: app.globalData.user.name,
		}).save().then(res => {
			app.showToast('success', '答题成功', imgSrc);
			this.setData({
				answer: ''
			});
		});
	},
	onTextareaHandler(e) {
		this.setData({
			answer: e.detail.value
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
		console.log(app.globalData.user);
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