/*eslint-disable */
import Question from '../../../model/question.js';

const app = getApp();

Page({
	data: {
		imgSrc: '../../../img/',
		question: '',
		qtImage: '',
	},
	onTextareaHandler(e) {
		this.setData({
			question: e.detail.value
		});
	},
	//上传文字题目
	upQuestion(e) {
		const {
			imgSrc
		} = this.data;

		if (e.detail.value.question == '') {
			app.showToast('success', '请输入问题', imgSrc);
			return;
		}

		new Question({
			question: e.detail.value.question,
			type: 'text',
			username: app.globalData.user.username,
			name: app.globalData.user.name,
		}).save().then(res => {
			app.showToast('success', '出题成功', imgSrc);
			this.setData({
				question: ''
			});
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
			new Question({
				question: url,
				type: 'image',
				username: app.globalData.user.username,
				name: app.globalData.user.name,
			}).save().then(res => {
				app.showToast('success', '题目图片上传成功', imgSrc);
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
	//重置密码
	gotoReset() {
		app.navigateTo('/pages/reset/index');
	},
	//登出
	logOut() {
		app.logOut();
	},
	onLoad(options) {

	},
	onReady() {

	},
	onShow() {
		app.getCurrentUser().then(res => {
			app.globalData.user = res.attributes;
		});
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