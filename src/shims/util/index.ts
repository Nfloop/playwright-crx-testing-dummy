
// @ts-nocheck
import _util, { promisify as promisify } from '_util';

export const promisify = function(first, ...rest) {
  if (first !== 'function') return Promise.resolve();
  return _promisify(first, ...rest);
};

export * from '_util';

const util = { ..._util, promisify };
export default util;
