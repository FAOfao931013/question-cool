/*eslint-disable */
import wxp from '../../utils/wxpApi.js'

const AV = require('../../lib/av-weapp-min.js');

const app = getApp();

const iconPath = '../../img/';

Page({
    data: {

    },
    onLoad(options) {

    },
    onReady() {

    },
    onShow() {
        const Question = AV.Object.extend('Question');

        const question = new Question();

        question.set('name', 'fao').save();

        new AV.Query('Question').find().then(res => {
            console.log(res);
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
});