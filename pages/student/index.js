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
				question: ''
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
		const qtImgs = new AV.Query('_File');

		Promise.all([
			question.find(),
			qtImgs.find()
		]).then(res => {
			const qtArr = res[0].map(item => ({
				id: item.id,
				question: item.attributes.question.question,
				createdAt: moment(item.createdAt).format('YYYY年M月D日')
			}));

			const qtImgs = res[1].map(item => ({
				id: item.attributes.key,
				question: item.attributes.url,
				createdAt: moment(item.createdAt).format('YYYY年M月D日')
			}));

			const result = [...qtArr, ...qtImgs];

			const questions = [];

			result.forEach(item => {
				if (questions.filter(_item => _item.time == item.createdAt).length > 0) {
					questions.forEach(qtItme => {
						if (qtItme.time == item.createdAt) {
							qtItme.qts.push({
								id: item.id,
								question: item.question
							});
						}
					});
				} else {
					questions.push({
						time: item.createdAt,
						qts: [{
							id: item.id,
							question: item.question
						}]
					});
				}
			});

			console.log(questions);
		})
	},
	onLoad(options) {

	},
	onReady() {

	},
	onShow() {
		this.getQuestion();
		app.getCurrentUser().then(res => {
			app.globalData.user = res;
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