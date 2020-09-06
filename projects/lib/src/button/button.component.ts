import { Component, Input, ViewEncapsulation, HostBinding, HostListener, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ee-button',
  template: `
  <div class="button-container">
    <ng-content></ng-content>
  </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styles: [`
  ee-button {
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

  ee-button .button-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ee-button:active { box-shadow: none; transform: translate(2px, 2px); }
  ee-button.no-shadow { box-shadow: none; }
  ee-button.no-border { border: none; }
  ee-button.icon { border-radius: 50%; min-width: var(--size); padding: 0; }

  ee-button.primary { background: var(--primary); color: #FFF; }
  ee-button.accent { background: var(--accent); color: #FFF;}

  ee-button.no-bg { background: #FFF; }
  ee-button.no-bg.primary { background: none; color: var(--primary);}
  ee-button.no-bg.accent { background: none; color: var(--accent); }
  ee-button.no-bg:hover { background-color: #F0F0F0; }
  ee-button.no-bg.primary:hover { background-color: #F0F0F0; }
  ee-button.no-bg.accent:hover { background-color: #F0F0F0; }

  ee-button[disabled] { color: var(--disabled); pointer-events: none; }
  ee-button.no-bg[disabled] { background: none; color: #BBB;}

  ee-button.clicked { pointer-events: none; }

  ee-button.loading { pointer-events: none; }
  ee-button:not(.loading) .loading { display: none; }
  ee-button:.loading .loading { display: initial; }
  `]
})
export class ButtonComponent  {
  @Input() disabled: string;
  @HostBinding('attr.tabindex') get tabindex() {
    return this.disabled === undefined ? 0 : -1;
  };
  @HostBinding('class.clicked') clicked;
  @HostListener('click') onClicked() {
    this.clicked = true;
    setTimeout(_ => this.clicked = false, 1000);
  }

  constructor(private el: ElementRef) {}
}
