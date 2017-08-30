/*eslint-disable */
//app.js
import wxp from './utils/wxpApi.js'
import Promise from './lib/es6-promise.min.js';

Object.assign = require('./utils/object-assign');

const AV = require('./lib/av-weapp-min.js');

AV.init({
    appId: 'AJapApvxTGRpbBYKvuwwmubx-gzGzoHsz',
    appKey: '6dXWCrl9u0pFBsatkgnQGog0',
});

App({
    globalData: {
        teacherNumber: '0101',
        user: '',
    },
    onLaunch() {

    },
    //预览图片
    previewImage(data) {
        return wxp.previewImage(data);
    },
    //选择图片
    chooseImage(data) {
        const _data = Object.assign({}, {
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            count: 9,
        }, data);
        return wxp.chooseImage(_data);
    },
    //返回前页
    back(delta = 1) {
        return wxp.navigateBack({
            delta,
        });
    },
    //关闭所以页面跳转
    reLaunch(page) {
        return wxp.reLaunch({
            url: page,
        });
    },
    //关闭当前页面跳转
    redirectTo(page) {
        return wxp.redirectTo({
            url: page
        });
    },
    //跳转页面
    navigateTo(page) {
        return wxp.navigateTo({
            url: page
        });
    },
    //封装消息提示框
    showToast(status, text, imgSrc = '../../img/') {
        switch (status) {
            case 'success':
                return wxp.showToast({
                    title: text,
                    icon: 'success'
                });
            case 'fail':
                return wxp.showToast({
                    title: text,
                    image: `${imgSrc}error.png`
                });
            case 'loading':
                return wxp.showToast({
                    title: text,
                    icon: 'loading'
                });
            default:
                console.log(status);
        }
    },
    //上传图片
    uploadImgFile(name, localFile) {
        return new AV.File(name, {
            blob: {
                uri: localFile,
            },
        }).save().then(file => {
            return file.url();
        }).catch(error => {
            console.log(error);
        });
    },
    //获取当前用户
    getCurrentUser() {
        return new Promise((resolve, reject) => {
            const currentUser = AV.User.current();

            if (currentUser) {
                resolve(currentUser);
            } else {
                this.navigateTo('/pages/login/index');
            }
        });
    },
    //重置密码
    resetPassword(mail) {
        AV.User.requestPasswordReset(mail).then(res => {
            this.logOut();
            this.reLaunch('/pages/login/index');
        });
    },
    //登出
    logOut() {
        AV.User.logOut().then(res => {
            this.reLaunch('/pages/login/index');
        });
    },
})