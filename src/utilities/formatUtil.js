/**
 * Created by cui on 9/20/16.
 */


const _formatCurrency = (num) => {
  if (!num) {
    return '0.00';
  }
  let numStr = num.toString().replace(/\$|\,/g, ''); // eslint-disable-line
  let numFloat = parseFloat(numStr);
  const sign = (numFloat === Math.abs(numFloat));
  numFloat = Math.floor(numFloat * 100 + 0.500000000000001);
  let cents = numFloat % 100;
  numStr = Math.floor(numFloat / 100).toString();
  if (cents < 10) {
    cents = '0' + cents;
  }
  for (let i = 0; i < Math.floor((numStr.length - (1 + i)) / 3); i++) {
    numStr = numStr.substring(0, numStr.length - (4 * i + 3)) + ',' +
      numStr.substring(numStr.length - (4 * i + 3));
  }

  return (((sign) ? '' : '-') + numStr + '.' + cents);
};

const _formatPercentNum = (num) => {
  if (!num) {
    return '0.00';
  }
  const num100 = parseFloat(num) * 100;
  const f = Math.floor(num100 * 100) / 100;
  let s = f.toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
};

const _formatPercentNumToFloat = (num) => parseFloat(num) / 100;

const _formatToFix = (num, i) => parseFloat(num).toFixed(i);

const _formatCurrencyTextToFloat = (str) => {
  const reg = /,/g;
  const strRe = str.toString().replace(reg, '');
  return parseFloat(strRe);
};

const _formatNumber = (n) => {
  const num = n.toString();
  return num[1] ? num : '0' + num;
};

const _formatTime = (date) => {
  const timeTamps = new Date(date);
  const year = timeTamps.getFullYear();
  const month = timeTamps.getMonth() + 1;
  const day = timeTamps.getDate();

  return [year, month, day].map(_formatNumber).join('/') + ' ';
};

const _removeBlankHandler = (str) => str.toString().replace(/\s/g, '');

const formatUtil = {
  formatCurrency: (moneyText) => _formatCurrency(moneyText),
  formatCurrencyTextToFloat: (str) => _formatCurrencyTextToFloat(str),
  formatPercentNum: (num) => _formatPercentNum(num),
  formatPercentNumToFloat: (num) => _formatPercentNumToFloat(num),
  formatToFix: (num, i) => _formatToFix(num, i),
  formatNumber: (num) => _formatNumber(num),
  formatTime: (date) => _formatTime(date),
  removeBlankHandler: (str) => _removeBlankHandler(str),
};

export default formatUtil;
