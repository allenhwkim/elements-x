import { define } from '../common/util.js';
import {XTranslation} from './translation.js';
   
export class XTranslationElement extends HTMLElement {
  constructor() {
    super();
    this.orgCThildElements; // in case attribute value changes
    this.orgKey;           // in case attribute value changes
    this.commonAttrName;   // this determine which element to translate
  }

  connectedCallback() {
    const lang = XTranslation.getLanguage();
    if (lang !== 'en' && !XTranslation[lang]) {
      console.error('Please provide translation before app starts', lang);
    }

    this._saveOriginal();  // set orgChildren, orgKey, commonAttrName

    if (this.attributes.length) { // listen to attribute change
      if (this.commonAttrName) {
        const el = this._getMatchingEl();
        this._translate(el);
      } else {
        this._translate(this);
      }

      const observer = new MutationObserver(this.attrMutationCallback.bind(this));
      observer.observe(this, {attributes: true});
    } else { // translate only once
      const attrMap = this._getAttrMap();
      this._translate(this, attrMap);
    }
  }

  attrMutationCallback(mutationList) {
    mutationList.forEach(mutation => {
      if (mutation.attributeName === this.commonAttrName) {
        const el = this._getMatchingEl();
        this._translate(el);
      } else if (mutation.attributeName.match(/^[a-z0-9]+$/i)) {
        this._translate(this);
      }
    });
  }

  _translate(keyEl) {
    const key = keyEl === this ? 
      this.orgKey.trim() : (keyEl.textContent || keyEl.innerText).trim();
    const attrMap = this._getAttrMap();
    const translated = XTranslation.translate(key, attrMap);
    if (translated) {
      this.innerHTML = translated;
    }    
  }

  _getMatchingEl() {
    const commonAttr = this.commonAttrName;
    const thisAttrVal = this.getAttribute(commonAttr);
    const el = this.orgChildren
      .find(el => 
        el.getAttribute(commonAttr) === thisAttrVal ||
        el.getAttribute(commonAttr) === 'default'
      );
    return el;
  }

  _saveOriginal() { // orgChildren, orgKey, commonAttrName
    if (!this.orgChildren) {
      this.orgChildren = Array.from(this.children || []);
      this.orgKey = (this.textContent || this.innerText).trim();

      const attrCounts = {};

      this.orgChildren.forEach(el => {
        Array.from(el.attributes).forEach(attr => {
          attrCounts[attr.name] = attrCounts[attr.name] || 0;
          attrCounts[attr.name]++;
        });
      });
      const found = Object.entries(attrCounts)
        .find( ([key, count]) => count === this.orgChildren.length);
      this.commonAttrName = found && found[0];
    } 
  }

  _getAttrMap() {
    return Array.from(this.attributes).reduce((res, el) => {
      res[el.name] = el.value; 
      return res;
    }, {});
  }

}
XTranslationElement.define = define('x-t9n', XTranslationElement);