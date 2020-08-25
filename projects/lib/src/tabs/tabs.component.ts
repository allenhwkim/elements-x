import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'ax-tabs',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [`./tabs.component.scss`]
})
export class TabsComponent implements AfterViewInit {
  @Input('selected') selected;
  tabsEls: Array<Element>;
  contentsEls: Array<Element>;

  constructor(private el: ElementRef, private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.initializeData();
  }

  initializeData() {
    const el = this.el.nativeElement;
    this.tabsEls = Array.from(el.querySelectorAll('[tab-for]'));
    this.contentsEls = Array.from(el.querySelectorAll('[contents-for]'));
    this.setAttributes();
    this.addEventListeners();
    this.selectTabAndContents(this.selected, false);
  }

  setAttributes() {
    const el = this.el.nativeElement;
    el.querySelector('[tab-for]').parentElement.setAttribute('role', 'tablist');
    this.tabsEls.forEach(el => {
      const tabId = el.getAttribute('tab-for');
      el.setAttribute('id', tabId);
      el.setAttribute('role', 'tab');
      el.setAttribute('aria-controls', `${tabId}-contents`);
      el.setAttribute('tabindex', '0');
    });

    this.contentsEls.forEach(el => {
      const contentsId = el.getAttribute('contents-for');
      el.setAttribute('role', 'tabpanel');
      el.setAttribute('id', `${contentsId}-contents`);
      el.setAttribute('aria-labelledby', contentsId);
      el.setAttribute('tabindex', '0');
    });
  }

  selectTabAndContents(tabId?: string, setFocus=true) {
    if (!tabId) {
      const el = this.el.nativeElement;
      const tabEl =
        el.querySelector('[tab-for][aria-selected]') || // user-defined
        el.querySelector('[tab-for]'); // or first one
      tabId = tabEl && tabEl.getAttribute('tab-for');
    }
    this.selectTab(tabId, setFocus);
    this.selectContents(tabId);
    // this.cd.detectChanges();
  }

  addEventListeners() {
    this.tabsEls.forEach(el => {
      el.addEventListener('click', this.clickHandler.bind(this));
      el.addEventListener('keydown', this.keydownHandler.bind(this));
    });
  }

  selectTab(tabId, setFocus) {
    const el = this.el.nativeElement;
    const tabEl: HTMLElement = el.querySelector(`[tab-for="${tabId}"]`);
    this.tabsEls
      .filter(el => !el.isEqualNode(tabEl))
      .forEach(el => {
        el.classList.remove('selected'); // old way
        el.removeAttribute('aria-selected'); // new way
        el.removeAttribute('tabindex');
      });

    tabEl.classList.add('selected'); // old way
    tabEl.setAttribute('aria-selected', 'true'); // new way
    tabEl.setAttribute('tabindex', '0');

    const inkBar = el.querySelector('.ink-bar');
    if (inkBar) {
      Object.assign(inkBar.style, {
        width: tabEl.offsetWidth +'px', 
        left: tabEl.offsetLeft +'px'
      })
    }
    setFocus && tabEl.focus();
  }

  selectContents(tabId) {
    const el = this.el.nativeElement;
    const contentsEl = el.querySelector(`[contents-for="${tabId}"]`);

    this.contentsEls
      .filter(el => !el.isEqualNode(contentsEl))
      .forEach(el => {
        el.classList.remove('selected');   // old way
        el.removeAttribute('aria-selected'); // new way
      });

    contentsEl.classList.add('selected'); // old way
    contentsEl.setAttribute('aria-selected', 'true'); // new way
  }

  keydownHandler(e: KeyboardEvent) {
    const availTabs = this.tabsEls.filter(el => el.getAttribute('disabled') === null);
    const inc = e.keyCode === 39 ? 1 : // Right
       e.keyCode === 37 ? -1 : 0; // Left
    const curSelectedTab = this.tabsEls.find(el => el.getAttribute('aria-selected') !== null);
    const curIndex = availTabs.indexOf(curSelectedTab);
    const nxtIndex = (availTabs.length + curIndex + inc) % availTabs.length;
    const tabId = availTabs[nxtIndex].getAttribute('tab-for');

    this.selectTabAndContents(tabId);
  }

  clickHandler(e: MouseEvent) {
    const tabEl = (<any>e.target).closest('kx-tabs [tab-for]');
    tabEl && this.selectTabAndContents(tabEl.getAttribute('tab-for'));
  }
}
