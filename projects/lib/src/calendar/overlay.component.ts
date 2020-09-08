import { 
  Component, Input, ChangeDetectorRef,
  ElementRef, AfterViewInit, HostListener
} from '@angular/core';

//
// The following propereies and functoina are for when startBy is given
//
// 0. open and close by start-by element
// 1. When Escape Pressed, Hide Overlay
// 2. When Document Clicked, Hide Overlay
// 3. Trap Focus Inside Overlay
// 4. Position Overlay Accordingly To Position In Viewport
// 5. When Overlay Closed, Focus Back To The Previous Element
//
@Component({ selector: 'kx-overlay', template: '' })
export class OverlayComponent {
  // visible = true;

  constructor(
    public el: ElementRef,
    public cd: ChangeDetectorRef
  ) {}

  id: string;
  startByConfig = { trapFocus: true };
  startByFocused: boolean = false;
  _visible: boolean;
  set visible(val) {
    this._visible = val;
    this.el.nativeElement.style.display = val ? 'block' : 'none';
  }
  get visible() { return this._visible; }
  @Input('start-by') startBy: string; // index
  @HostListener('window:resize') winResize() { this.close('window-resize') }
  @HostListener('document:keydown.escape') onEsc() {
    this.startBy && this.visible && this.close('document:escape');
  }
  @HostListener('document:click', ['$event']) docClick(event) {
    const hostEl = this.el.nativeElement;
    const closetHostEl = event.target.closest(hostEl.tagName);
    const hostClicked = closetHostEl === hostEl;
    this.startBy && !this.startByFocused &&
      closetHostEl !== hostEl && this.close('document:click');
  }
  
  ngAfterViewInit() {
    if (this.startBy) {
      const el = this.el.nativeElement;
      this.id = el.id || `kx-${parseInt('' + Math.random() * 10000)}`;
      el.setAttribute('id', this.id);
      el.classList.add('has-start-by');
      this.setKeyboardEvent(this.startBy);
    }
  }
    
  open(by) {
    this.visible = true;
    this.setHostElPosition();
    this.startByFocused = true;
    setTimeout(_ => this.trapFocus(this.el.nativeElement) );
    this.cd.detectChanges();
    console.log('.... open', by);
  }

  close(by) {
    if (this.startBy) {
      this.startByFocused = false;
      this.visible = false;
      this.cd.detectChanges();
    }
  }
  
  private setKeyboardEvent(startById) {
    const el = document.getElementById(startById);
    if (el) {
      this.startByFocused = false;
      this.visible = false;
      this.cd.detectChanges();
      el.setAttribute('aria-controlls', this.id);
      el.setAttribute('aria-activedescendant', `${this.id}-selected`);
      el.addEventListener('focus', _ => this.open('startBy focus') );
      el.addEventListener('blur', _ => {
        this.startByFocused = false;
        // this.visible = false;
      });
    } else {
      const hostEl = this.el.nativeElement;
      console.error(`[${hostEl.tagName}] invalid input id`, this.startBy);
    }
  }

  protected setHostElPosition() {
    const startByEl = document.getElementById(this.startBy);
    const hostEl = this.el.nativeElement;
    // hostEl.style.display = '';
    const startByAtBottom = this.startByAtBottom(hostEl);
    hostEl.style.left = `${startByEl.offsetLeft}px`;
    if (startByAtBottom) {
      hostEl.style.top = `${startByEl.offsetTop - hostEl.offsetHeight}px`;
    } else {
      hostEl.style.top = `${startByEl.offsetTop + startByEl.offsetHeight}px`;
    }
  }
  
  protected startByAtBottom(hostEl) {
    const startByEl = document.getElementById(this.startBy);
    const winHeight = window.innerHeight;
    const elYPos = startByEl.getBoundingClientRect().bottom;
    return winHeight < (elYPos + hostEl.offsetHeight + 12); // gap 12px
  }

  private trapFocus(element) {
    element.setAttribute('tabindex', element.getAttribute('tabindex') || '-1');

    const focusableEls = Array.from(element.querySelectorAll(
      'a[href], button, textarea, input[type="text"],' +
      'input[type="radio"], input[type="checkbox"], select, [tabindex]'
    )).filter( (el: any) => {
      const tabindex = el.getAttribute('tabindex') || '0';
      return !el.disabled && tabindex !== '-1';
    });

    const firstFocusableEl: any = focusableEls[0];
    const lastFocusableEl: any = focusableEls[focusableEls.length - 1];

    element.addEventListener('keydown', function(e) {
      const isTabPressed = e.keyCode === 9; // isTabPressed
      if (!isTabPressed) { return; }

      if ( e.shiftKey ) /* shift + tab */ {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else /* tab */ {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    });
  }
}
