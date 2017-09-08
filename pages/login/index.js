/*eslint-disable */
import wxp from '../../utils/wxpApi.js';

const AV = require('../../lib/av-weapp-min.js');

const app = getApp();

Page({
	data: {

	},
	onLoad(options) {

	},
	onReady() {

	},
	onShow() {
		const currentUser = AV.User.current();

		if (currentUser) {
			this.decideGotoPage(currentUser.attributes.username);
		};
	},
	onHide() {

	},
	onUnload() {

	},
	onPullDownRefresh() {

	},
	onReachBottom() {

	},
	//根据不同用户进入不同的首页
	decideGotoPage(number) {
		if (app.globalData.teacherUsername.includes(number)) {
			app.redirectTo('/pages/teacher/index/index');
		} else {
			app.redirectTo('/pages/student/index/index');
		}
	},
	gotoRegister() {
		app.navigateTo('/pages/register/index');
	},
	login(number, password) {
		AV.User.logIn(number, password).then(user => {
			this.decideGotoPage(number);
		}).catch(res => {
			app.showToast('fail', '输入的学号或密码不对');
		})
	},
	//提交表单数据
	formSubmit(e) {
		if (e.detail.value.number == '') {
			app.showToast('fail', '请输入学号');
			return;
		};

		if (e.detail.value.password == '') {
			app.showToast('fail', '请输入密码');
			return;
		};

		this.login(e.detail.value.number, e.detail.value.password);
	}
})