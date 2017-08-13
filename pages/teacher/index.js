/*eslint-disable */
import wxp from '../../utils/wxpApi.js';

const app = getApp();

Page({
	data: {
		imgSrc: '../../img/',
		question: '',
		qtImage: '',
	},
	//上传答题图片
	uploadQtImg() {
		const {
			qtImage
		} = this.data;

		if (qtImage == '') {
			app.showToast('fail', '请选择题目图片');
		}

		const name = qtImage.split('//')[qtImage.split('//').length - 1];

		app.uploadImgFile(name, qtImage).then(() => {
			this.delQtImg();
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
			this.setData({
				user: res,
			});
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