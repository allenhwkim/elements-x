import { Component, ElementRef, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'custom-css',
  template: `
    <ee-button class="primary no-bg no-border no-shadow"
      (click)="showThis = true">Edit Custom Style</ee-button>
    <ee-button class="primary no-bg no-border no-shadow"
      (click)="resetCustomStyle()">Reset Custom Style</ee-button>
    <pre *ngIf="showThis" ace mode="css" theme="github" (blur)="applyCustomCss($event)">
      <ng-content></ng-content>
    </pre>
    `,
 styles: [`
 :host { position: relative; display: block;}
 [ace] {
   position: absolute;
   top: 32px;
   left: 0;
   width: 100%;
   box-shadow: 2px 2px 8px #CCC;
   z-index: 1;
 }
   `]
})
export class CustomCssComponent implements OnDestroy {
  @HostListener('document:click', ['$event']) docClick(event) {
    const hostEl = this.el.nativeElement;
    const closetHostEl = event.target.closest(hostEl.tagName);
    console.log({hostEl, closetHostEl});
    (closetHostEl !== hostEl) && (this.showThis = false);
  }

  customStyleEl: HTMLStyleElement;
  showThis;

  constructor(private el: ElementRef) {}

  applyCustomCss(event) {
    this.customStyleEl = document.body.querySelector('style#custom-style');
    if (!this.customStyleEl) {
      this.customStyleEl = document.createElement('style');
      this.customStyleEl.id = 'custom-style';
      document.body.appendChild(this.customStyleEl);
    }

    this.customStyleEl.innerHTML = event.detail.value;
  }

  resetCustomStyle() {
    this.showThis = false;
    this.customStyleEl.remove();
  }

  ngOnDestroy() {
    this.customStyleEl && this.customStyleEl.remove();
  }
}