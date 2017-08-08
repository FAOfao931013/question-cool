/*eslint-disable */
const AV = require('../lib/av-weapp-min.js');

class Student extends AV.Object {
	get number() {
		return this.get('number');
	}
	set number(value) {
		this.set('number', value);
	}

	get password() {
		return this.get('password');
	}

	set password(value) {
		this.set('password', value);
	}
}

AV.Object.register(Student, 'Student');

export default Student;