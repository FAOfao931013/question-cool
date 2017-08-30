/*eslint-disable */
import wxp from '../../utils/wxpApi.js';
import isEmail from '../../utils/isEmail.js';
import Users from '../../model/users.js';

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
	registerUser(number, password, mail) {
		const user = new AV.User();

		user.setUsername(number);
		user.setPassword(password);
		user.setEmail(mail);

		user.signUp().then(user => {
			//加入用户表
			new Users({
				username: number,
				type: app.globalData.teacherNumber.includes(number) ? 'teacher' : 'student'
			}).save();

			app.showToast('success', '注册成功').then(() => {
				setTimeout(() => app.reLaunch('/pages/login/index'), 1000);
			});
		}, error => {
			app.showToast('fail', '该用户或邮箱已存在');
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

		if (e.detail.value.mail == '') {
			app.showToast('fail', '请输入邮箱');
			return;
		} else if (!isEmail(e.detail.value.mail)) {
			app.showToast('fail', '请输入正确的邮箱地址');
			return;
		};

		this.registerUser(e.detail.value.number, e.detail.value.password, e.detail.value.mail);
	}
})