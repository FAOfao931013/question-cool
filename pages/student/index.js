/*eslint-disable */
import wxp from '../../utils/wxpApi.js';
import moment from '../../lib/moment.js';
import Promise from '../../lib/es6-promise.min.js';

const AV = require('../../lib/av-weapp-min.js');

const app = getApp();

Page({
	data: {
		questions: [{
			time: '',
			qts: [{
				id: '',
				question: '',
				type: ''
			}]
		}, ]
	},
	gotoReset() {
		app.navigateTo('/pages/reset/index');
	},
	logOut() {
		app.logOut();
	},
	getQuestion() {
		const question = new AV.Query('Question');

		question.find().then(res => {
			const result = res.map(item => ({
				id: item.id,
				question: item.attributes.question,
				type: item.attributes.type,
				time: moment(item.createdAt).format('YYYY年M月D日'),
				createdAt: item.createdAt
			}));

			//格式化数据
			const questions = [];

			result.forEach(item => {
				if (questions.filter(_item => _item.time == item.time).length > 0) {
					questions.forEach(qtitem => {
						if (qtitem.time == item.time) {
							qtitem.qts.push({
								id: item.id,
								question: item.question,
								type: item.type,
							});
						}
					});
				} else {
					questions.push({
						time: item.time,
						createdAt: item.createdAt,
						qts: [{
							id: item.id,
							question: item.question,
							type: item.type,
						}]
					});
				}
			});

			//按照日期排序
			questions.sort(function(a, b) {
				return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
			});

			//文字题总是在前
			questions.forEach(item => {
				const textArr = item.qts.filter(_item => _item.type == 'text');
				const imageArr = item.qts.filter(_item => _item.type == 'image');

				item.qts = [...textArr, ...imageArr];
			});

			this.setData({
				questions,
			});
		})
	},
	onLoad(options) {

	},
	onReady() {

	},
	onShow() {
		this.getQuestion();
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