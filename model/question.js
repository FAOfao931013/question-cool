/*eslint-disable */
const AV = require('../lib/av-weapp-min.js');

class Question extends AV.Object {
	get name() {
		return this.get('name');
	}
	set name(value) {
		this.set('name', value);
	}

	get number() {
		return this.get('number');
	}

	set number(value) {
		this.set('number', value);
	}
}

AV.Object.register(Question, 'Question');

export default Question;