/*eslint-disable */
const app = getApp();

const AV = require('../../../lib/av-weapp-min.js');

Page({
	data: {
		imgSrc: '../../../img/',
		students: [],
		id: '',
		type: '',
		accuracy: 0,
	},
	//按学号排序
	ascendingByUsername() {
		this.getStudents('username');
	},
	//按日期排序
	ascendingByDate() {
		this.getStudents('createdAt');
	},
	//跳转批改详情页面
	gotoDetail(e) {
		if (this.data.type != 'choose') {
			app.navigateTo(`/pages/teacher/detail/index?id=${e.currentTarget.id}`);
		}
	},
	//获取评论
	getComment(students) {
		const {
			id,
		} = this.data;

		const commentQuery = new AV.Query('Comment');

		commentQuery.equalTo('questionId', id);

		commentQuery.find().then(res => {
			const comment = res.map(item => ({
				username: item.attributes.username,
				result: item.attributes.result,
			}));

			this.setData({
				students: students.map(item => {
					comment.forEach(_item => {
						if (_item.username == item.username) {
							item.isComment = true;
							item.result = _item.result;
						}
					})

					return item;
				})
			});
		});
	},
	//自动批改
	autoComment(answer, students) {
		students = students.map(item => {
			const qtAnswerArr = answer.split('');
			const chooseAnswerArr = item.answer.split('');

			const accuracy = (qtAnswerArr.filter((item, index) => item == chooseAnswerArr[index]).length / answer.length).toFixed(2) * 100;

			item.result = `正确率${accuracy}%`;
			item.isComment = true;

			return item;
		});

		this.setData({
			students,
			type: 'choose',
			accuracy: students.length == 0 ? 0 : (students.filter(item => item.result == '正确率100%').length / students.length).toFixed(4) * 100,
		});
	},
	//获取学生列表
	getStudents(ascend = 'username') {
		const {
			id
		} = this.data;

		var answerQuery = new AV.Query('Answer');

		answerQuery.equalTo('questionId', id);

		answerQuery.ascending(ascend);

		answerQuery.find().then(res => {
			const stuQuery = new AV.Query('Student');

			stuQuery.find().then(_res => {
				let students = res.map(item => ({
					username: item.attributes.username,
					name: item.attributes.name,
					id: item.id,
					isComment: false,
					result: '',
					answer: item.attributes.answer,
				}));


				students.forEach(item => {
					_res.map(_item => {
						if (item.username == _item.attributes.username) {
							item.teacherItems = _item.attributes.teacherItems;
						}
					})
				});

				students = students.filter(item => item.teacherItems.map(i => i.value).includes(app.globalData.user.username));

				const question = new AV.Query('Question');

				question.equalTo('objectId', id);

				question.find().then(res => {
					if (res[0].attributes.type == 'choose' || res[0].attributes.type == 'imageChoose') {
						this.autoComment(res[0].attributes.answer, students);
					} else {
						this.getComment(students);
					}
				});
			});
		});
	},
	onLoad(options) {
		this.setData({
			id: options.id
		});
	},
	onReady() {

	},
	onShow() {
		this.getStudents();
	},
	onHide() {

	},
	onUnload() {

	},
	onPullDownRefresh() {
		this.getStudents().then(() => {
			wx.stopPullDownRefresh();
		});
	},
	onReachBottom() {

	},
})