/*eslint-disable */
import wxp from '../../utils/wxpApi.js';
import Question from '../../model/question.js';

const AV = require('../../lib/av-weapp-min.js');

const app = getApp();

Page({
    data: {

    },
    formSubmit(e) {
        app.resetPassword(e.detail.value.mail);
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
});