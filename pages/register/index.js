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
	//用户注册
	registerUser(userInfo) {
		const {
			username,
			password,
			mail,
			name,
		} = userInfo;

		const user = new AV.User();

		user.setUsername(username);
		user.setPassword(password);
		user.setEmail(mail);
		user.set('name', name);

		user.signUp().then(user => {
			//加入用户表
			new Users({
				username,
				type: app.globalData.teacherUsername.includes(username) ? 'teacher' : 'student',
				name,
			}).save();

			app.showToast('success', '注册成功').then(() => {
				setTimeout(() => app.reLaunch('/pages/login/index'), 1000);
			});
		}, error => {
			app.showToast('fail', '该用户或邮箱已存在');
		});
	},
	formSubmit(e) {
		const {
			username,
			password,
			mail,
			name,
		} = e.detail.value;

		if (username == '') {
			app.showToast('fail', '请输入学号');
			return;
		};

		if (password == '') {
			app.showToast('fail', '请输入密码');
			return;
		};

		if (mail == '') {
			app.showToast('fail', '请输入邮箱');
			return;
		} else if (!isEmail(mail)) {
			app.showToast('fail', '请输入正确的邮箱地址');
			return;
		};

		if (name == '') {
			app.showToast('fail', '请输入姓名');
			return;
		};

		this.registerUser({
			username,
			password,
			mail,
			name,
		});
	}
})