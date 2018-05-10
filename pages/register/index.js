/*eslint-disable */
import wxp from '../../utils/wxpApi.js';
import isEmail from '../../utils/isEmail.js';
import Users from '../../model/users.js';
import Teacher from '../../model/teacher.js';
import Student from '../../model/student.js';

const AV = require('../../lib/av-weapp-min.js');

const app = getApp();

Page({
	data: {
		teacherItems: [],
	},
	onLoad(options) {

	},
	onReady() {

	},
	onShow() {
		this.initTeacherItems();
	},
	onHide() {

	},
	onUnload() {

	},
	onPullDownRefresh() {

	},
	onReachBottom() {

	},
	initTeacherItems() {
		const userQuery = new AV.Query('Teacher');

		userQuery.find().then(res => {
			this.setData({
				teacherItems: res.map(item => ({
					value: item.attributes.username,
					name: item.attributes.name,
					checked: false,
				}))
			});
		});
	},
	changeTeacherItems(e) {
		const {
			teacherItems
		} = this.data;

		teacherItems.forEach(item => {
			if (e.detail.value.includes(item.value)) {
				item.checked = true;
			} else {
				item.checked = false;
			}
		});

		this.setData({
			teacherItems,
		});
	},
	//用户注册
	registerUser(userInfo) {
		let {
			username,
			password,
			mail,
			name,
			teacherItems,
		} = userInfo;

		teacherItems = teacherItems.filter(item => item.checked);

		const user = new AV.User();

		user.setUsername(username);
		user.setPassword(password);
		user.setEmail(mail);
		user.set('name', name);

		const type = app.globalData.teacherUsername.includes(username) ? 'teacher' : 'student';

		user.signUp().then(user => {
			//加入用户表
			new Users({
				username,
				type,
				name,
				teacherItems,
			}).save();

			//老师表中加入老师
			if (type == 'teacher') {
				new Teacher({
					username,
					name,
				}).save();
			}

			//学生表中加入学生
			if (type == 'student') {
				new Student({
					username,
					name,
					teacherItems,
				}).save();
			}

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

		const {
			teacherItems
		} = this.data;

		if (username == '') {
			app.showToast('fail', '请输入学号');
			return;
		};

		if (!app.globalData.teacherUsername.includes(username)) {
			if (username.length != 13) {
				app.showToast('fail', '请输入正确的学号');
				return;
			}
		}

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

		if (teacherItems.filter(item => item.checked).length == 0) {
			app.showToast('fail', '请选择你的老师');
			return;
		}

		this.registerUser({
			username,
			password,
			mail,
			name,
			teacherItems,
		});
	}
})