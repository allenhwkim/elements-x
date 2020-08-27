import { Component, ElementRef, AfterViewInit, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnInit} from '@angular/core';
import { fireCustomEvent } from '../fire-custom-event';
import { OverlayComponent } from '../overlay.component';

@Component({
  selector: 'ee-clock',
  templateUrl: './clock.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host {
      display: block;
      /* position: relative; //This affects offsetX/Y. Don't */
      width: 160px;
      height: 160px;
    }
    :host .clock {
      width: 100%;
      height: 100%;
    }
    :host.has-start-by {
      position: absolute;
      background: #FFF;
      outline: none;
      left: 0;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 4px 4px 8px #CCC;
      padding: 4px;
      box-sizing: border-box;
    }
  `]
})
export class ClockComponent extends OverlayComponent implements OnInit, AfterViewInit {
  onDrag = false;
  time: Date = new Date();
  dratStaPos; // used to check if drag started
  dragEl; // dragging hand; hour or minute
  prevMin;
  @Input() hour;
  @Input() minute;

  @HostListener('document:mouseup') docMouseUp() {
    this.onDrag = false; 
  }
  @HostListener('mousedown', ['$event']) onMousedown(event)  {
    this.onDrag = true;
    this.dratStaPos = [event.pageX, event.pageY];
    const handEl = event.target.closest('#hour, #minute');
    this.dragEl = handEl && handEl.id;
  }

  @HostListener('mousemove', ['$event']) onMousemove(event)  {
    const hourHand = this.el.nativeElement.querySelector('#hour');
    if (this.onDrag) {
      const dragEndPos = [event.pageX, event.pageY];
      const distance = this.distance(this.dratStaPos, dragEndPos);
      const deg = this.mouseToDeg(event);
      if (distance && this.dragEl === 'hour') {
        const [h, min] = this.degToTime(deg);
        const hour = 
          this.time.getHours() === 23 && h === 0 ? 0 :
          this.time.getHours() === 11 && h === 0 ? 12 :
          this.time.getHours() === 12 && h === 11 ? 11 :
          this.time.getHours() === 0 && h === 11 ? 23 : 
          this.time.getHours() >= 12 ? h + 12 : h;
        this.time.setHours(hour);
        this.time.setMinutes(min);
        this.updateHourHand(this.time);
      } else if (distance && this.dragEl === 'minute') {
        const min = this.degToMin(deg);
        this.time.setMinutes(min);
        this.updateMinuteHand(this.time);
      }
    }
  }

  constructor(
    public el: ElementRef, 
    public cd: ChangeDetectorRef
  ) {
    super(el, cd);
  }

  ngOnInit() {
    this.hour && this.time.setHours(this.hour);
    this.minute && this.time.setMinutes(this.minute);
  }

  ngAfterViewInit () {
    super.ngAfterViewInit();
    setTimeout(_ => this.updateHourHand(this.time)); // to avoid value chanfged error
  }

  onKeydown(event, min) {
    const millisec = this.time.getTime();
    if ([39, 38].indexOf(event.keyCode) > -1 ) { // right, up
      this.updateHourHand(new Date(millisec + min * 60000));
      event.preventDefault();
    } else if ([37, 40].indexOf(event.keyCode) > -1 ) { // left, down
      this.updateHourHand(new Date(millisec - min * 60000));
      event.preventDefault();
    }
  }

  updateHourHand(time: Date, updateMin=true) {
    this.time = new Date(time.getTime());
    const [hour, min] = [time.getHours(), time.getMinutes()];
    const hourDeg = ((hour % 12) * 60) / 2; 
    const minDeg = (min/60) * (360/12); // 1 hour 30 deg
    const deg = hourDeg + minDeg;
    const hourHand = this.el.nativeElement.querySelector('#hour');
    hourHand.setAttribute("transform",`rotate(${deg})`);
    updateMin && this.updateMinuteHand(this.time, false);
    this.time.toString = 
      function() { return this.toLocaleTimeString(undefined) };
    fireCustomEvent(this.el.nativeElement, 'time-selected', this.time);
  }

  updateMinuteHand(time: Date, updateHour=true) {
    this.time = new Date(time.getTime());
    const min = time.getMinutes();
    const deg =  360/60 * min; // 1 min 6 deg
    const minuteHand = this.el.nativeElement.querySelector('#minute');
    if (this.onDrag) {
      const inc = 
        this.prevMin === 59 && min === 0 ? 1 :
        this.prevMin === 0 && min === 59 ? -1 : 0;
      this.time.setHours(this.time.getHours() + inc);      
    }

    minuteHand.setAttribute("transform",`rotate(${deg})`);
    updateHour && this.updateHourHand(this.time, false);
    this.prevMin = min;
  }

  degToTime(deg: number) {
    const deg2 =  deg < 0 ? (180+deg) + 180 : deg;
    const hour = Math.floor(deg2 / 30);  // 1 hour = 30 deg.
    const min = (Math.floor(deg2) % 30) * 2;

    return [hour, min];
  }

  degToMin(deg: number) {
    const deg2 =  deg < 0 ? (180+deg) + 180 : deg;
    return Math.floor(deg2 / 6);
  }

  mouseToDeg(event: MouseEvent) {
    const box = this.el.nativeElement.querySelector('.clock');
    const offset = this.cumulativeOffset(box);
    const [centerX, centerY] = [
      offset.x + box.offsetWidth / 2, 
      offset.y + box.offsetHeight / 2
    ];

    const atan2 = Math.atan2(
      event.pageX - centerX, 
      (event.pageY - centerY) * -1
    );
    const deg = atan2 * (180 / Math.PI );  
    return deg;
  }

  private distance(a, b) {
    return Math.sqrt(
      Math.pow( (a[0] - b[0]) ,2) + 
      Math.pow( (a[1] - b[1]) ,2)
    );
  }

  private cumulativeOffset(element) {
    let y = 0, x = 0;
    do {
      y += element.offsetTop  || 0;
      x += element.offsetLeft || 0;
    } while(element = element.offsetParent);

    return {x, y};
  }
}