import { Component, Input, ViewEncapsulation, HostBinding, HostListener, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ax-button',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  styles: [`
  ax-button {
    --primary: #3751B5;
    --accent: #FF4081;
    --disabled: rgba(0,0,0,.26);
    --size: 32px;
    display: inline-block;
    margin: 8px 8px 8px 0;
    border: 1px solid currentColor;
    border-radius: 4px;
    padding: 0 16px;
    box-sizing: border-box;
    position: relative;
    user-select: none;
    cursor: pointer;
    white-space: nowrap;
    vertical-align: bottom;
    text-align: center;
    min-width: 60px;
    line-height: var(--size);
    /* overflow: visible; */
    border: 1px solid rgba(0,0,0,.12);
    box-shadow: 2px 2px 4px #CCC;
  }

  ax-button:active { box-shadow: none; transform: translate(2px, 2px); }
  ax-button.no-shadow { box-shadow: none; }
  ax-button.no-border { border: none; }
  ax-button.icon { border-radius: 50%; min-width: var(--size); padding: 0; }

  ax-button.primary { background: var(--primary); color: #FFF; }
  ax-button.accent { background: var(--accent); color: #FFF;}

  ax-button.no-bg { background: #FFF; }
  ax-button.no-bg.primary { background: none; color: var(--primary);}
  ax-button.no-bg.accent { background: none; color: var(--accent); }
  ax-button.no-bg:hover { background-color: #F0F0F0; }
  ax-button.no-bg.primary:hover { background-color: #F0F0F0; }
  ax-button.no-bg.accent:hover { background-color: #F0F0F0; }

  ax-button[disabled] { color: var(--disabled); pointer-events: none; }
  ax-button.no-bg[disabled] { background: none; color: #BBB;}

  ax-button.clicked { pointer-events: none; }
  ax-button:not(.clicked) .loading { display: none; }
  ax-button:.clicked .loading { display: initial; }
  `]
})
export class ButtonComponent  {
  @Input() disabled: string;
  @Input() loadingBy;
  @HostBinding('attr.tabindex') get tabindex() {
    return this.disabled === undefined ? 0 : -1;
  };
  @HostBinding('class.clicked') get clsClicked() { 
    if (this.loadingBy === undefined)
      return this._clicked
    else if (this.loadingBy !== undefined && this._clicked)
      return this.loadingBy
  }
  @HostListener('click') onClicked() {
    this._clicked = true;
    if (this.loadingBy === undefined) {
      setTimeout(_ => this._clicked = false, 1000);
    }
  }
  // indicates user clicked button.
  // w/o this.loadingBy, reset after 1 second 
  // w/ this.loadingBy, reset by this.loadingBy
  _clicked = false;

  constructor(private el: ElementRef) {}
}
