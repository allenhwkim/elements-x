import { Component, ElementRef, Input, AfterViewInit } from '@angular/core';
import Prism from 'prismjs';

@Component({
  selector: 'ee-prism, [ee-prism]',
  template: '<ng-content></ng-content>',
  styles: [`
    :host.dark {
      background: #333;
      color: #FFF;
      padding: 8px;
    }`
  ]
})
export class PrismComponent implements AfterViewInit {
  @Input() set code(str) {
    if (str !== undefined) {
      const code = this.fixIndent(str);
      const grammar = Prism.languages[this.language];
      const html = Prism.highlight(code, grammar, this.language);
      this.el.nativeElement.innerHTML = html;
    }
  };
  @Input() language = 'javascript';

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const code = this.fixIndent(this.el.nativeElement.innerText);
    const grammar = Prism.languages[this.language];
    const html = Prism.highlight(code, grammar, this.language);
    this.el.nativeElement.innerHTML = html;
  }

  private fixIndent(code) {
    const removeThis = (code.match(/^([ ]+)/) || [])[1];
    if (removeThis) {
      const re = new RegExp(`^${removeThis}`, 'gm')
      return code.replace(re, '');
    }
    return code;
  }
}
