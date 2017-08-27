/*eslint-disable */
const AV = require('../lib/av-weapp-min.js');

class Answer extends AV.Object {
	get answer() {
		return this.get('answer');
	}
	set answer(value) {
		this.set('answer', value);
	}

	get type() {
		return this.get('type');
	}
	set type(value) {
		this.set('type', value);
	}
}

AV.Object.register(Answer, 'Answer');

export default Answer;