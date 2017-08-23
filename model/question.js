/*eslint-disable */
const AV = require('../lib/av-weapp-min.js');

class Question extends AV.Object {
	get question() {
		return this.get('question');
	}
	set question(value) {
		this.set('question', value);
	}

	get type() {
		return this.get('type');
	}
	set type(value) {
		this.set('type', value);
	}
}

AV.Object.register(Question, 'Question');

export default Question;