/*eslint-disable */
import wxp from '../../utils/wxpApi.js';
import Student from '../../model/student.js';

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

	},
	onHide() {

	},
	onUnload() {

	},
	onPullDownRefresh() {

	},
	onReachBottom() {

	},
	gotoRegister() {
		app.navigateTo('/pages/register/index');
	},
	findStudent(number, password) {
		const numberQuery = new AV.Query('Student');
		const passwordQuery = new AV.Query('Student');
		numberQuery.equalTo('number', number);
		passwordQuery.equalTo('password', password);

		AV.Query.and(numberQuery, passwordQuery).find().then(res => {
			if (res.length > 0) {
				if (number === app.globalData.teacherNumber) {
					app.redirectTo(`/pages/teacher/index?number=${number}`);
				} else {
					app.redirectTo(`/pages/student/index?number=${number}`);
				}
			} else {
				app.showToast('fail', '输入的学号或密码不对');
			}
		});
	},
	formSubmit(e) {
		if (e.detail.value.number == '') {
			app.showToast('fail', '请输入学号');
			return;
		};

		if (e.detail.value.password == '') {
			app.showToast('fail', '请输入密码');
			return;
		};

		this.findStudent(e.detail.value.number, e.detail.value.password);
	}
})