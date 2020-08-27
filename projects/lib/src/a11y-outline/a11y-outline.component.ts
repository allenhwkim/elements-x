import { Component, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'ee-a11y-outline, [ee-a11y-outline]',
  template: `<ng-content></ng-content>`,
  styles: [`
    :host:not(.a11y-outline) ::ng-deep :focus {
      outline: none !important;
    }
  `]
})
export class A11yOutlineComponent  {
  @HostBinding('class.a11y-outline') outline;
  @HostListener('document:click') docClick() {this.outline = 0;}
  @HostListener('document:keydown.tab') docTab() {this.outline = 1;}
}
