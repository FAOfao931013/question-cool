/*eslint-disable */
const AV = require('../lib/av-weapp-min.js');

class Users extends AV.Object {
	get username() {
		return this.get('username');
	}
	set username(value) {
		this.set('username', value);
	}

	get type() {
		return this.get('type');
	}
	set type(value) {
		this.set('type', value);
	}
}

AV.Object.register(Users, 'Users');

export default Users;