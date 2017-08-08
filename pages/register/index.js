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
	findStudent(number, password) {
		const numberQuery = new AV.Query('Student');
		numberQuery.equalTo('number', number);

		numberQuery.find().then(res => {
			if (res.length > 0) {
				app.showToast('fail', '该用户已经存在');
			} else {
				this.registerStudent(number, password);
			}
		});
	},
	registerStudent(number, password) {
		new Student({
			number,
			password,
		}).save().then(res => {
			app.showToast('success', '注册成功').then(() => {
				setTimeout(() => app.back(), 1000);
			});
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