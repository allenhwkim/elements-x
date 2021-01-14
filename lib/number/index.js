class XNumber extends HTMLElement {
  // adoptedCallback() {}

  constructor(...args) {
    const self = super(...args);
    return self;
  }

  static get observedAttributes() {
    return [
      'value',
      'locale', 'style', 'currency', 'unit',
      'unit-display', 'use-grouping',
      'minimum-integer-digits', 'minimum-fraction-digits', 'maximum-fraction-digits', 'minimum-significant-digits', 'maximum-significant-digits', 'notation',
      'compact-display', 'currency-display', 'currency-sign',
      'notation', 'numbering-system', 'sign-display'
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._init();
  }

  connectedCallback() {
    this._init();
  }

  _init(args = {style: 'currency', currency: 'USD'}) {
    this.value = this.getAttribute('value') || 0;
    this.locale = this.getAttribute('locale') || 'en-US';
    const options = this._getOptions(args);

    this.innerText = 
      new Intl.NumberFormat(this.locale, options).format(+this.value);
  }

  _getOptions(args) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
    const options = {
      style: 
        this.getAttribute('style') || args.style || undefined,
      currency: 
        this.getAttribute('currency') || args.currency || undefined,
      unit: 
        this.getAttribute('unit') || undefined,
      unitDisplay:
        this.getAttribute('unit-display') || undefined,
      useGrouping:
        this.getAttribute('use-grouping') || undefined,
      notation:
        this.getAttribute('notation') || undefined,
      compactDisplay:
        this.getAttribute('compact-display') || undefined,
      currencyDisplay:
        this.getAttribute('currency-display') || undefined,
      currencySign:
        this.getAttribute('currency-sign') || undefined,
      numberingSystem:
        this.getAttribute('numbering-system') || undefined,
      signDisplay: 
        this.getAttribute('sign-display') || undefined,
      minimumIntegerDigits:
        this.getAttribute('minimum-integer-digits') || undefined,
      minimumFractionDigits:
        this.getAttribute('minimum-fraction-digits') || undefined,
      maximumIntegerDigits:
        this.getAttribute('maxmum-fraction-digits') || undefined,
      minimumSignificantDigits:
        this.getAttribute('minimum-significant-digits') || undefined,
      maximumSignificantDigits:
        this.getAttribute('maximum-significant-digits') || undefined
    }
    
    return options;
  }
}

class XCurrency extends XNumber {}

if (!customElements.get('x-number')) {
  customElements.define('x-number', XNumber);
}
if (!customElements.get('x-currency')) {
  customElements.define('x-currency', XCurrency);
}

