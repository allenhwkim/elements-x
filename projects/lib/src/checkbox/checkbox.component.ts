import { Component, Input, ViewEncapsulation, ElementRef,
  ChangeDetectorRef } from '@angular/core';
  
@Component({
  selector: 'ee-checkbox, [ee-checkbox]',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    [ee-checkbox],
    ee-checkbox input {
      --ee-checkbox-size: 20px;
      --ee-checkbox-border: #333;
      --ee-checkbox-fill: red;
      --ee-checkbox-icon: '\\2714';
      --ee-checkbox-color: inherit;
      outline: none;
      position: relative;
      width: 1px;
      height: 1px;
      display: inline-block;
      margin: 0;
      margin-right: var(--ee-checkbox-size);
      margin-bottom: var(--ee-checkbox-size);
      vertical-align: middle;
    }
    [ee-checkbox]:focus::after,
    [ee-checkbox]:hover::after,
    ee-checkbox input:focus::after,
    ee-checkbox input:hover::after {
      content: '';
      position: absolute;
      left: -6px;
      top: -6px;
      height: calc(var(--ee-checkbox-size) + 12px);
      width: calc(var(--ee-checkbox-size) + 12px);
      border-radius: 50%;
      background: rgba(0,0,0,.1);
      z-index: -1;
    }

    [ee-checkbox]::before,
    ee-checkbox input::before  {
      display: flex;
      box-sizing: border-box;
      content: '';
      position: absolute;
      width: var(--ee-checkbox-size);
      height: var(--ee-checkbox-size);
      background-color: #FFF;
      border-radius: 4px;
      border: 1px solid var(--ee-checkbox-border);
      color: var(--ee-checkbox-color);
      align-items: center;
      justify-content: center;
    }

    [ee-checkbox]:disabled,
    ee-checkbox input:disabled {
      opacity: 0.5;
      background: #CCC;
    }

    [ee-checkbox]:checked::before,
    ee-checkbox input:checked::before {
      content: var(--ee-checkbox-icon);
    }

    [ee-checkbox].filled:checked::before,
    ee-checkbox.filled input:checked::before {
      border: none;
      background: var(--ee-checkbox-fill);
      color: #FFF;
    }

    [ee-checkbox]:filled:checked.disabled::before,
    ee-checkbox.filled input:checked.disabled::before {
      border: 1px solid #CCC;
      background: #CCC;
      color: #FFF;
    }`
  ]
})
export class CheckboxComponent  {
  @Input() icon;
  @Input() border;
  @Input() fill;
  @Input() size;
  @Input() color;

  constructor(
    private el: ElementRef, 
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    const isInput = this.el.nativeElement.tagName === 'INPUT';
    const el = isInput ? this.el.nativeElement :
      this.el.nativeElement.querySelector('input');

    if (this.fill) {
      this.el.nativeElement.classList.add('filled');
      el.style.setProperty('--ee-checkbox-fill', this.fill);
    }
    if (this.icon) {
      const icon = this.icon.charCodeAt(0).toString(16);
      el.style.setProperty('--ee-checkbox-icon', `'\\${icon}'`);
    }
    this.size && el.style.setProperty('--ee-checkbox-size', this.size);
    this.border && el.style.setProperty('--ee-checkbox-border', this.border);
    this.color && el.style.setProperty('--ee-checkbox-color', this.color);
  }

}
  