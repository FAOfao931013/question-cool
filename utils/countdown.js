/*eslint-disable */
import moment from '../lib/moment.js';

let countdown;

const countdownFunc = (_endDate, outsideFunc) => {
	const endDate = new Date(_endDate);
	const diffSecond = parseInt((endDate - new Date()) / 1000); //结束时间到现在差的秒数

	if (diffSecond > 0) {
		const offset = moment.duration(diffSecond, 'seconds');
		const month = offset.months();
		const day = offset.days();
		const hour = offset.hours();
		const minute = offset.minutes();
		const second = offset.seconds();

		const diff = moment({
			month: month,
			day: day,
			hour: hour,
			minute: minute,
			second: second
		});

		if (day > 0) {
			countdown = diff.format("D天 HH:mm:ss");
		} else {
			countdown = diff.format("HH:mm:ss");
		}

		outsideFunc(countdown);
	} else {
		outsideFunc(false);
	}

}

export default (_endDate, outsideFunc, interval = 1000) => {
	return setInterval(() => countdownFunc(_endDate, outsideFunc), interval);
}