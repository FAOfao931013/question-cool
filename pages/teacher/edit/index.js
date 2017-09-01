/*eslint-disable */
import moment from '../../../lib/moment.js';
import Promise from '../../../lib/es6-promise.min.js';

const AV = require('../../../lib/av-weapp-min.js');

const app = getApp();

Page({
	data: {
		imgSrc: '../../../img/',
		qtImage: '',
	},
	//删除问题
	delQuestion() {
		const {
			id,
			imgSrc
		} = this.data;

		const questionObj = AV.Object.createWithoutData('Question', id);

		return app.showModal({
			title: '删除问题',
			content: '是否确认删除当前问题',
			confirmText: '确认删除'
		}).then(res => {
			if (res.confirm) {
				questionObj.destroy().then(() => {
					app.showToast('success', '删除成功', imgSrc);

					setTimeout(() => {
						app.back();
					}, 1000)
				});
			}
		});
	},
	//修改问题
	editQuestion(question, type) {
		const {
			id,
			imgSrc
		} = this.data;

		const questionObj = AV.Object.createWithoutData('Question', id);

		questionObj.set('question', question);

		questionObj.set('type', type);

		return questionObj.save().then(() => {
			app.showToast('success', '修改成功', imgSrc);
		});
	},
	//修改题目（文字）
	upQuestion(e) {
		const {
			imgSrc
		} = this.data;

		if (e.detail.value.question == '') {
			app.showToast('fail', '请输入问题', imgSrc);
			return;
		}

		this.editQuestion(e.detail.value.question, 'text');
	},
	//修改题目（照片）
	uploadQtImg() {
		const {
			qtImage,
			imgSrc,
		} = this.data;

		if (qtImage == '') {
			app.showToast('fail', '请选择题目图片', imgSrc);
			return;
		}

		const name = qtImage.split('//')[qtImage.split('//').length - 1];

		app.uploadImgFile(name, qtImage).then(url => {
			this.editQuestion(url, 'image').then(() => {
				this.delQtImg();
			});
		});
	},
	//删除题目照片
	delQtImg() {
		this.setData({
			qtImage: ''
		});
	},
	//预览题目照片
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
				qtImage: res.tempFilePaths[0]
			});
		});
	},
	//获取当前问题
	getCurrentQuestion() {
		const {
			id
		} = this.data;

		const question = new AV.Query('Question');

		question.equalTo('objectId', id).find().then(res => {
			if (res[0].attributes.type == 'text') {
				this.setData({
					question: res[0].attributes.question,
				});
			} else {
				this.setData({
					qtImage: res[0].attributes.question,
				});
			}
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
		this.getCurrentQuestion();
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