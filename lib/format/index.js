export class XFormat extends HTMLElement {

  static get observedAttributes() {
    return ['locale', 'format', 'currency', 'max-decimal', 'type', 'value'];
  }

  constructor(...args) {
    const self = super(...args);
    this.type;
    this.locale = 'en-US';
    this.maxDecimal = 2;
    this.format = 'yyyy-MM-dd';
    this.currency = 'USD';
    return self;
  }

  connectedCallback() {}
  disconnectedCallback() {} 

  attributeChangedCallback(name, oldValue, newValue) {
    this.type = this.getAttribute('type') || this.type;
    if (!['number', 'currency', 'date'].includes(this.type)) return;

    this.locale = this.getAttribute('locale') || this.locale;
    this.maxDecimal = this.getAttribute('max-decimal') || this.maxDecimal; 
    this.currency = this.getAttribute('currency') || this.currency;
    this.format = this.getAttribute('format') || 
      this.getAttribute('locale') && this._getDateFormat(this.locale) || this.format;

    let formatted;
    if (this.type === 'number') {
      const num = +this.getAttribute('value');
      formatted = new Intl.NumberFormat(this.locale, {
        maximumFractionDigits: this.maxDecimal
      }).format(num);
    } else if (this.type === 'currency') {
      const num = +this.getAttribute('value');
      formatted = new Intl.NumberFormat(this.locale, {
        currency: this.currency,
        style: 'currency'
      }).format(num);
    } else if (this.type === 'date') {
      const date = this.getAttribute('value') ? new Date(this.getAttribute('value')) : new Date();
      formatted = this._date2str(date, this.locale, this.format);
    }

    try {
      this.innerText = formatted;
    } catch(e) {
      this.innerText = e;
    }
  }

  _date2str(date, locale, format='yyyy-MM-dd') {
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

  _getDateFormat(locale) {
    const [language, country] = locale.toLowerCase().split(/[-_]/);
    /* eslint-disable indent */
    const format = 
      ['fi'].includes(country) ? 'dd.MM.yyyy ' : // finland
      ['fr', 'th'].includes(country) ? 'dd/MM/yyyy' : 
      ['it', 'no'].includes(country) ? 'dd.MM.yy' :
      ['es'].includes(country) ? 'dd-MM-yy' :
      ['us'].includes(country) ? 'MM-dd-yy' :
      ['gb'].includes(country) ? 'dd/MM/yy' : 'yyyy-MM-dd';

    return format;
  }
}

if (!customElements.get('x-format')) {
  customElements.define('x-format', XFormat);
}
