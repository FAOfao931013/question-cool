/*eslint-disable */
import wxPromisify from './wxPromisify.js';

const wxp = {};

const wxApis = [
	'getSetting',
	'authorize',
	'login',
	'getUserInfo',
	'request',
	'getLocation',
	'openLocation',
	'getSystemInfo',
	'navigateTo',
	'navigateBack',
	'checkSession',
	'showToast',
	'redirectTo',
	'makePhoneCall',
	'chooseImage',
	'previewImage',
	'uploadFile',
	'requestPayment',
	'reLaunch',
	'showModal'
];

wxApis.forEach(api => {
	wxp[api] = wxPromisify(wx[api]);
});

export default wxp;
