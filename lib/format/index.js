import { define } from '../common';

export class XFormat extends HTMLElement {
  connectedCallback() {
    this.type = this.getAttribute('type') || 'number'; // number, currency, or date
    this.locale = this.getAttribute('locale') || 'en-US'; // ko-KR, en-US, etc.
    this.maxDecimal = this.getAttribute('max-decimal') || 2; // max decimal places
    this.currency = this.getAttribute('currency') || 'USD'; // currency code
    this.format = this.getAttribute('format') || getLocaleDateFormat(this.locale) ; // date format
    this.orgText = this.innerText

    try {
      this.innerText = format(this.orgText, this.type, this);
    } catch(e) {
      this.innerText = e; // show error in case of error
    } 
  }

}
XFormat.define = define('x-format', XFormat);

/**
 * Returns formatted value 
 * @param {string} text 
 * @param {string} type, number, currency, date
 * @param {object} options, {locale, maxDecimal, currency, format}
 */
export function format(text, type, options) {
  const { locale='en-US', maxDecimal=2, currency='USD', format='yyyy-MM-dd'} = options;
  switch(type) {
    case 'number':
      return new Intl.NumberFormat(locale, { maximumFractionDigits: maxDecimal }).format(+text);
    case 'currency':
      return new Intl.NumberFormat(locale, { currency: currency, style: 'currency' }).format(+text);
    case 'date':
      const date = text ? new Date(text) : new Date();
      return formatDate(date, locale, format);
    default:
      return '[error] invalid type ' + type;
  }
}

function getLocaleDateFormat(locale) {
  const [language, country] = locale.toLowerCase().split(/[-_]/);
  return ['fi'].includes(country) ? 'dd.MM.yyyy ' : // finland
    ['fr', 'th'].includes(country) ? 'dd/MM/yyyy' : 
      ['it', 'no'].includes(country) ? 'dd.MM.yy' :
        ['es'].includes(country) ? 'dd-MM-yy' :
          ['us'].includes(country) ? 'MM-dd-yy' :
            ['gb'].includes(country) ? 'dd/MM/yy' : 'yyyy-MM-dd';
}

/**
 * Returns a date string in the format specified by the locale and format 
 * @param {Date} date 
 * @param {string} locale, e.g. 'en-US'
 * @param {string} format, e.g. 'yyyy-MM-dd', 'yyyy-MM-dd HH:mm:ss', 'weekday month dd, yyyy'
 * @returns {string} formatted date
 */
function formatDate(date, locale, format='yyyy-MM-dd') {
  const [month, weekday] = new Intl.DateTimeFormat(locale, {weekday: 'long', month: 'long'})
    .format(date).split(' ');
  const [mon, week] = new Intl.DateTimeFormat(locale, {weekday: 'short' ,month: 'short'}) 
    .format(date).split(' ');

  var z = {
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  };

  const formatted = format
    .replace(/month/ig, _ => '⑫⑫').replace(/mon/ig, _ => '⑫')
    .replace(/weekday/ig, _ => '⑦⑦').replace(/week/ig, _ => '⑦')
    .replace(/(y{2,})/g, v => date.getFullYear().toString().slice(-v.length))
    .replace(/(M+|d+|h+|m+|s+)/g, v => ((v.length > 1 ? '0' : '') + z[v.slice(-1)]).slice(-2))
    .replace(/⑫⑫/g, _ => month).replace(/⑫/g, _ => mon)
    .replace(/⑦⑦/ig, _ => weekday).replace(/⑦/ig, _ => week);

  return formatted;
}