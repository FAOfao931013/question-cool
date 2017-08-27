/*eslint-disable */
import wxp from '../../utils/wxpApi.js';
import Answer from '../../model/answer.js';

const AV = require('../../lib/av-weapp-min.js');

const app = getApp();

Page({
	data: {
		imgSrc: '../../img/',
		id: '',
		question: '',
		type: '',
		answer: '',
		asImg: ''
	},
	//上传图片题目
	uploadAsImg() {
		const {
			asImg
		} = this.data;

		if (asImg == '') {
			app.showToast('fail', '请选择答题图片');
		}

		const name = asImg.split('//')[asImg.split('//').length - 1];

		app.uploadImgFile(name, asImg).then(url => {
			new Answer({
				answer: url,
				username: app.globalData.user.username,
				type: 'image',
			}).save().then(res => {
				app.showToast('success', '答题图片上传成功');
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
		new Answer({
			answer: e.detail.value.answer,
			type: 'text',
		}).save().then(res => {
			app.showToast('success', '答题成功');
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
			console.log(res[0]);
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