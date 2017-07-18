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
		userInfo: null,
	},
	onLaunch() {

	},
})