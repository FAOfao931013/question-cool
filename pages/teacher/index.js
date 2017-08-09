/*eslint-disable */
import wxp from '../../utils/wxpApi.js';

const app = getApp();

Page({
	data: {
		imgSrc: '../../img/',
		question: '',
		qtImage: '',
	},
	previewImage(e) {
		return app.previewImage({
			current: e.currentTarget.id,
			urls: [e.currentTarget.id]
		})
	},
	chooseImage() {
		app.chooseImage({
			count: 1
		}).then(res => {
			this.setData({
				qtImage: res.tempFilePaths[0]
			});
		});
	},
	gotoReset() {
		app.navigateTo('/pages/reset/index');
	},
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