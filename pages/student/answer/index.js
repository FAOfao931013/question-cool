/*eslint-disable */
import Answer from '../../../model/answer.js';

const AV = require('../../../lib/av-weapp-min.js');

const app = getApp();

Page({
	data: {
		imgSrc: '../../../img/',
		id: '',
		question: '',
		type: '',
		answer: '',
		asImg: '',
		chooseAnswer: '',
		qtAnswer: '',
		accuracy: 0,
	},
	//统计答案正确率
	getAccuracy() {
		const {
			qtAnswer,
			chooseAnswer,
		} = this.data;

		if (qtAnswer && chooseAnswer) {
			const qtAnswerArr = qtAnswer.split('');
			const chooseAnswerArr = chooseAnswer.split('');

			const accuracy = (qtAnswerArr.filter((item, index) => item == chooseAnswerArr[index]).length / qtAnswer.length).toFixed(2) * 100;

			this.setData({
				accuracy,
			});
		}
	},
	//监听选择题答案变化
	onChooseAnswerChangeHandler(e) {
		this.setData({
			chooseAnswer: e.detail.value,
		});
	},
	//上传选择题答案
	upChooseAnswer() {
		const {
			chooseAnswer,
			imgSrc,
			qtAnswer
		} = this.data;

		if (chooseAnswer == '') {
			app.showToast('fail', '请填写答案', imgSrc);
			return;
		}

		if (qtAnswer.length !== chooseAnswer.length) {
			app.showToast('fail', '答案数量不对', imgSrc);
			return;
		}

		this.answerHandler(chooseAnswer, 'choose');
	},
	//删除答题照片
	delAsImg() {
		this.setData({
			asImg: ''
		});
	},
	//预览答题照片
	previewImage(e) {
		return app.previewImage({
			current: e.currentTarget.id,
			urls: [e.currentTarget.id]
		})
	},
	//选择题目照片
	chooseImage() {
		app.chooseImage({
			count: 1
		}).then(res => {
			console.log(res);
			this.setData({
				asImg: res.tempFilePaths[0]
			});
		});
	},
	//新增答案
	addAnswer(answer, type) {
		const {
			id,
			imgSrc
		} = this.data;

		return new Answer({
			answer,
			username: app.globalData.user.username,
			type,
			questionId: id,
			name: app.globalData.user.name,
		}).save();
	},
	//更新答案
	updateAnswer(answer, type, id) {
		const answerObj = AV.Object.createWithoutData('Answer', id);

		return app.showModal({
			title: '修改答案',
			content: '是否要修改当前问题的答案',
			confirmText: '确认修改'
		}).then(res => {
			if (res.confirm) {
				answerObj.set('answer', answer);
				answerObj.set('type', type);

				answerObj.save();
			} else {
				throw 'noChange';
			}
		});
	},
	//答案处理函数
	answerHandler(answer, type) {
		const {
			id,
			imgSrc
		} = this.data;

		const queryOne = new AV.Query('Answer');
		const queryTwo = new AV.Query('Answer');

		queryOne.equalTo('username', app.globalData.user.username);

		queryTwo.equalTo('questionId', id);

		const answerQuery = AV.Query.and(queryOne, queryTwo);

		answerQuery.find().then(res => {
			if (res.length > 0) {
				if (type == 'choose' || type == 'imageChoose') {
					app.showToast('fail', '只能回答一次', imgSrc);
				} else {
					return this.updateAnswer(answer, type, res[0].id).then(() => {
						app.showToast('success', '答案修改成功', imgSrc);
					});
				}
			} else {
				return this.addAnswer(answer, type).then(() => {
					app.showToast('success', '答案上传成功', imgSrc);
					this.getAccuracy();
				});
			}
		});
	},
	//上传文字回答
	upAnswer(e) {
		const {
			imgSrc
		} = this.data;

		const {
			answer
		} = e.detail.value;

		if (answer == '') {
			app.showToast('fail', '请输入答案', imgSrc);
			return;
		}

		this.answerHandler(answer, 'text');
	},
	//上传图片题目
	uploadAsImg() {
		const {
			asImg,
			id,
			imgSrc,
		} = this.data;

		if (asImg == '') {
			app.showToast('fail', '请选择答题图片', imgSrc);
			return;
		}

		const name = asImg.split('//')[asImg.split('//').length - 1];

		app.uploadImgFile(name, asImg).then(url => {
			this.answerHandler(url, 'image');
		});
	},
	//获取问题详情
	getQuestion() {
		const {
			id
		} = this.data;

		const question = new AV.Query('Question');

		const queryOne = new AV.Query('Answer');
		const queryTwo = new AV.Query('Answer');

		queryOne.equalTo('username', app.globalData.user.username);

		queryTwo.equalTo('questionId', id);

		const answerQuery = AV.Query.and(queryOne, queryTwo);

		question.equalTo('objectId', id).find().then(res => {
			this.setData({
				question: res[0].attributes.question,
				type: res[0].attributes.type,
				qtAnswer: res[0].attributes.answer ? res[0].attributes.answer : '',
			});

			answerQuery.find().then(_res => {
				if (_res.length > 0) {
					if (_res[0].attributes.type == 'choose' || _res[0].attributes.type == 'imageChoose') {
						this.setData({
							chooseAnswer: _res[0].attributes.answer
						});
						this.getAccuracy();
					}
				}
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
		this.getQuestion();
	},
	onHide() {

	},
	onUnload() {

	},
	onPullDownRefresh() {
		this.getQuestion().then(() => {
            wx.stopPullDownRefresh();
        });
	},
	onReachBottom() {

	},
})