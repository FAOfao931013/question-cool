/*eslint-disable */
import Promise from '../lib/es6-promise.min.js';

function wxPromisify(fn) {
  return (obj = {}) => {
    return new Promise((resolve, reject) => {
      obj.success = (res) => {
        resolve(res);
      };
      obj.fail = (res) => {
        reject(res);
      };
      fn(obj);
    });
  };
}

export default wxPromisify;
