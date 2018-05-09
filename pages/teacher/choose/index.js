/*eslint-disable */
import Question from '../../../model/question.js';
import moment from '../../../lib/moment.js';

const app = getApp();

const AV = require('../../../lib/av-weapp-min.js');

Page({
	data: {
		imgSrc: '../../../img/',
		qtImage: '',
		imageChooseAnswer: '',
		chooseAnswer: '',
		qtTime: ''
	},
	onTimeHandler(e) {
		this.setData({
			qtTime: e.detail.value
		});
	},
	onInputHandler(e) {
		this.setData({
			imageChooseAnswer: e.detail.value
		});
	},
	//上传图片题目
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
			this.addQuestion(url, 'imageChoose').then(res => {
				app.showToast('success', '选择题图片上传成功', imgSrc);
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
	//新增问题
	addQuestion(question, type) {
		const {
			qtTime,
			imgSrc
		} = this.data;

		if (qtTime == '') {
			app.showToast('fail', '请输入答题时长', imgSrc);
			return;
		}

		const endDate = moment().add(qtTime, 'm').format('YYYY-MM-DD HH:mm:ss');

		return new Question({
			question,
			type,
			answer: type == 'imageChoose' ? this.data.imageChooseAnswer : this.data.chooseAnswer,
			username: app.globalData.user.username,
			name: app.globalData.user.name,
			endDate,
		}).save();
	},
	//上传选择题和答案题目
	upQuestion(e) {
		const {
			imgSrc
		} = this.data;
		console.log(e);

		if (e.detail.value.question == '') {
			app.showToast('fail', '请输入问题', imgSrc);
			return;
		}

		this.setData({
			chooseAnswer: e.detail.value.answer,
		});

		this.addQuestion(e.detail.value.question, 'choose').then(res => {
			app.showToast('success', '出题成功', imgSrc);
		});
	},
	onLoad() {

	},
	onReady() {

	},
	onShow() {

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