import { Component, Input, AfterContentInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef, HostListener, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ee-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- carousel items -->
    <div class="items" #itemsContainer>
      <ng-content></ng-content> 
    </div>

    <!-- prev/next buttons -->
    <button class="prev button" aria-label="previous"
      (click)="showPrev()">&nbsp;</button>
    <button class="next button" aria-label="next"
      (click)="showNext()">&nbsp;</button>

    <!-- shortcuts for each item -->
    <div class="shortcuts">
      <button class="button"
        (click)="show(i)" [ngClass]="{active: selected === i}"
        *ngFor="let btn of items; let i = index">{{i}}</button>
    </div>`,
  styles: [`
  :host { display: block; position: relative; }
  :host /deep/ .items { overflow: auto; display: flex; }
  :host /deep/ .items > * { transform: scale(0.99); opacity: .5; transition: all .3s; }
  :host /deep/ .items > .active {  transform: scale(1); opacity: 1; }
  :host /deep/ .button {
    border: 0;
    background: transparent;
    display: inline-block;
    color: #FFF;
    opacity: .3;
  }
  :host /deep/ .button:hover,
  :host /deep/ .button:focus {
    opacity: 1;
  }
  :host /deep/ .button.prev { 
    position: absolute; left: 0; top: 50%; transform: translateY(-50%);
  }
  :host /deep/ .button.next {
    position: absolute; right: 0; top: 50%; transform: translateY(-50%);
  }
  :host /deep/ .next.button::before { font-size: 2em; content: '\\25B6'; }
  :host /deep/ .prev.button::before { font-size: 2em; content: '\\25C0'; }
  :host /deep/ .shortcuts {
    position: absolute;
    bottom: 4px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  :host /deep/ .shortcuts .button {
    width: 1em; 
    height: 1em;
    border-radius: 50%;
    background: #FFF;
    opacity: .3;
    color: transparent;
  }
  :host /deep/ .shortcuts .button:hover,
  :host /deep/ .shortcuts .button:focus { opacity: .7 }
  :host /deep/ .shortcuts .button.active { opacity: 1 }
  `]
})
export class CarouselComponent implements AfterViewInit {
  @Input() selected: number = 0;
  @ViewChild('itemsContainer') itemsContainer: ElementRef;
  @HostListener('keyup.ArrowLeft') kbeLeft() { this.showPrev(); }
  @HostListener('keyup.ArrowRight') kbdRight() { this.showNext(); }
  @HostBinding('tabindex') get tabindex() { return -1; }
  items: Array<HTMLElement>;

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.items = Array.from(this.itemsContainer.nativeElement.children);
    this.cd.detectChanges();
    this.show(this.selected);
  }

  show(number) {
    this.items[this.selected].classList.remove('active');
    this.selected = +number;
    this.items[this.selected]
      .scrollIntoView({
        behavior: 'smooth', 
        inline: 'center',
        block: 'nearest'
      });
    this.items[this.selected].classList.add('active');
    this.cd.detectChanges();
  }

  showPrev() {
    const index = 
      (this.selected + this.items.length - 1) % this.items.length;
    this.show(index);
  }

  showNext() {
    const index = 
      (this.selected + this.items.length + 1) % this.items.length;
    this.show(index);
  }
}