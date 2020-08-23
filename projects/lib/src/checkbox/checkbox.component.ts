import { Component, Input, ViewEncapsulation, ElementRef,
  ChangeDetectorRef } from '@angular/core';
  
@Component({
  selector: 'ax-checkbox, [ax-checkbox]',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    [ax-checkbox],
    ax-checkbox input {
      --ax-checkbox-size: 20px;
      --ax-checkbox-border: #333;
      --ax-checkbox-fill: red;
      --ax-checkbox-icon: '\\2714';
      --ax-checkbox-color: inherit;
      outline: none;
      position: relative;
      width: 1px;
      height: 1px;
      display: inline-block;
      margin: 0;
      margin-right: var(--ax-checkbox-size);
      margin-bottom: var(--ax-checkbox-size);
      vertical-align: middle;
    }
    [ax-checkbox]:focus::after,
    [ax-checkbox]:hover::after,
    ax-checkbox input:focus::after,
    ax-checkbox input:hover::after {
      content: '';
      position: absolute;
      left: -6px;
      top: -6px;
      height: calc(var(--ax-checkbox-size) + 12px);
      width: calc(var(--ax-checkbox-size) + 12px);
      border-radius: 50%;
      background: rgba(0,0,0,.1);
      z-index: -1;
    }

    [ax-checkbox]::before,
    ax-checkbox input::before  {
      display: flex;
      box-sizing: border-box;
      content: '';
      position: absolute;
      width: var(--ax-checkbox-size);
      height: var(--ax-checkbox-size);
      background-color: #FFF;
      border-radius: 4px;
      border: 1px solid var(--ax-checkbox-border);
      color: var(--ax-checkbox-color);
      align-items: center;
      justify-content: center;
    }

    [ax-checkbox]:disabled,
    ax-checkbox input:disabled {
      opacity: 0.5;
      background: #CCC;
    }

    [ax-checkbox]:checked::before,
    ax-checkbox input:checked::before {
      content: var(--ax-checkbox-icon);
    }

    [ax-checkbox].filled:checked::before,
    ax-checkbox.filled input:checked::before {
      border: none;
      background: var(--ax-checkbox-fill);
      color: #FFF;
    }

    [ax-checkbox]:filled:checked.disabled::before,
    ax-checkbox.filled input:checked.disabled::before {
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
      el.style.setProperty('--ax-checkbox-fill', this.fill);
    }
    if (this.icon) {
      const icon = this.icon.charCodeAt(0).toString(16);
      el.style.setProperty('--ax-checkbox-icon', `'\\${icon}'`);
    }
    this.size && el.style.setProperty('--ax-checkbox-size', this.size);
    this.border && el.style.setProperty('--ax-checkbox-border', this.border);
    this.color && el.style.setProperty('--ax-checkbox-color', this.color);
  }

}
  