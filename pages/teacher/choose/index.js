/*eslint-disable */
import Question from '../../../model/question.js';

const app = getApp();

const AV = require('../../../lib/av-weapp-min.js');

Page({
	data: {
		imgSrc: '../../img/',
		checkItems: [{
			value: 'A',
			checked: true,
		}, {
			value: 'B',
			checked: false,
		},{
			value: 'C',
			checked: false,
		},{
			value: 'D',
			checked: false,
		}],
		result: 'A',
	},
	//新增问题
	addQuestion(question, type) {
		return new Question({
			question,
			type,
			answer: this.data.result,
			username: app.globalData.user.username,
			name: app.globalData.user.name,
		}).save();
	},
	//上传选择题和答案题目
	upQuestion(e) {
		const {
			imgSrc
		} = this.data;

		if (e.detail.value.question == '') {
			app.showToast('fail', '请输入问题', imgSrc);
			return;
		}

		this.addQuestion(e.detail.value.question, 'choose').then(res => {
			app.showToast('success', '出题成功', imgSrc);
		});
	},
	//更改选择题答案
	changeItems(e) {
		const {
			checkItems
		} = this.data;

		checkItems.forEach(item => {
			item.checked = item.value == e.detail.value;
		});

		this.setData({
			result: checkItems.filter(item => item.checked)[0].value,
			checkItems,
		});
	},
	onLoad() {

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
})