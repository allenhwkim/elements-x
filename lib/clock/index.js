import html from './clock.html';
import css from './clock.css';
import {setHTML, addCss, removeCss, setTargetValue} from '../common/util';

class XClock extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    this.target;
    this._docMouseUpHandler = this._onDragEnd.bind(this);
    return self;
  }

  connectedCallback() {
    addCss(this, css);
    this.target = document.getElementById(this.getAttribute('target'));
    setHTML(this, html).then(_ => {
      this._init();
      document.addEventListener('mouseup', this._docMouseUpHandler);
      document.addEventListener('touchend', this._docMouseUpHandler);
    });
  }

  disconnectedCallback() {
    removeCss(this);
    document.removeEventListener('mouseup', this._docMouseUpHandler);
    document.removeEventListener('touchend', this._docMouseUpHandler);
  }

  _init() {
    this._onDrag = false;
    this._time = new Date();
    this._dragStaPos; // used to check if drag started
    this._dragElId; // dragging hand; hour-hand or minute-hand
    this._prevMin;
    this._hour = this.getAttribute('hour');
    this._minute = this.getAttribute('minute');
    this.addEventListener('mousedown', this._onDragStart.bind(this));
    this.addEventListener('touchstart', this._onDragStart.bind(this),{ passive: true });
    this.addEventListener('mousemove', this._onDragFunc.bind(this));
    this.addEventListener('touchmove', this._onDragFunc.bind(this), { passive: true });

    this._hour && this._time.setHours(this._hour);
    this._minute && this._time.setMinutes(this._minute);
    this.querySelector('#hour-hand').addEventListener('keydown', event => this._onKeydown(event, 60));
    this.querySelector('#minute-hand').addEventListener('keydown', event => this._onKeydown(event, 1));
    this._updateHourHand(this._time);
    this.getAttribute('run') && this._runClock();
  }

  _onDragEnd(event) { this._onDrag = false; }

  _onDragStart(event) {
    event.preventDefault();
    this._onDrag = true;
    this._dragStaPos = [event.pageX, event.pageY];
    const handEl = event.target.closest('#hour-hand, #minute-hand');
    this._dragElId = handEl && handEl.id;
  }

  _onDragFunc(event) {
    event.preventDefault();
    if (!this._onDrag) { return false; }

    const dragEndPos = [event.pageX, event.pageY];
    const distance = this._distance(this._dragStaPos, dragEndPos);
    const deg = this._mouseToDeg(event);
    if (distance && this._dragElId === 'hour-hand') {
      const [h, min] = this._degToTime(deg);
      const hour = 
        this._time.getHours() === 23 && h === 0 ? 0 :
          this._time.getHours() === 11 && h === 0 ? 12 :
            this._time.getHours() === 12 && h === 11 ? 11 :
              this._time.getHours() === 0 && h === 11 ? 23 : 
                this._time.getHours() >= 12 ? h + 12 : h;
      this._time.setHours(hour);
      this._time.setMinutes(min);
      this._updateHourHand(this._time);
    } else if (distance && this._dragElId === 'minute-hand') {
      const min = this._degToMin(deg);
      this._time.setMinutes(min);
      this._updateMinuteHand(this._time);
    }
  }

  _onKeydown(event, min) {
    const millisec = this._time.getTime();
    if ([39, 38].indexOf(event.keyCode) > -1 ) { // right, up
      this._updateHourHand(new Date(millisec + min * 60000));
      event.preventDefault();
    } else if ([37, 40].indexOf(event.keyCode) > -1 ) { // left, down
      this._updateHourHand(new Date(millisec - min * 60000));
      event.preventDefault();
    }
  }

  _updateHourHand(_time, updateMin=true, fireEvent=true) {
    this._time = new Date(_time.getTime());
    const [hour, min] = [_time.getHours(), _time.getMinutes()];
    const hourDeg = ((hour % 12) * 60) / 2; 
    const minDeg = (min/60) * (360/12); // 1 hour 30 deg
    const deg = hourDeg + minDeg;
    const hourHand = this.querySelector('#hour-hand');
    hourHand.setAttribute('transform',`rotate(${deg})`);
    updateMin && this._updateMinuteHand(this._time, false);
    this._time.toString = 
      function() { return this.toLocaleTimeString('en-US', {hour12: 0, hourCycle: 'h23'}).replace(/^24/,'00'); };
    this.querySelector('#digital-text').textContent = this._time;
    if (fireEvent) {
      const event = new CustomEvent('x-time-selected', {bubbles: true, detail: this._time});
      this.dispatchEvent(event);
      this.target && setTargetValue(this.target, this._time);
    }
  }

  _updateMinuteHand(_time, updateHour=true) {
    this._time = new Date(_time.getTime());
    const min = _time.getMinutes();
    const deg =  360/60 * min; // 1 min 6 deg
    const minuteHand = this.querySelector('#minute-hand');
    if (this._onDrag) {
      const inc = 
        this._prevMin === 59 && min === 0 ? 1 :
          this._prevMin === 0 && min === 59 ? -1 : 0;
      this._time.setHours(this._time.getHours() + inc);      
    }

    minuteHand.setAttribute('transform',`rotate(${deg})`);
    updateHour && this._updateHourHand(this._time, false);
    this._prevMin = min;
  }

  _degToTime(deg) {
    const deg2 =  deg < 0 ? (180+deg) + 180 : deg;
    const hour = Math.floor(deg2 / 30);  // 1 hour = 30 deg.
    const min = (Math.floor(deg2) % 30) * 2;

    return [hour, min];
  }

  _degToMin(deg) {
    const deg2 =  deg < 0 ? (180+deg) + 180 : deg;
    return Math.floor(deg2 / 6);
  }

  _mouseToDeg(event) {
    const box = this.querySelector('.x-clock');
    const offset = this._cumulativeOffset(box);
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

  _distance(a, b) {
    return Math.sqrt(
      Math.pow( (a[0] - b[0]) ,2) + 
      Math.pow( (a[1] - b[1]) ,2)
    );
  }

  _cumulativeOffset(element) {
    let y = 0, x = 0;
    do {
      y += element.offsetTop  || 0;
      x += element.offsetLeft || 0;
      element = element.offsetParent;
    } while(element);

    return {x, y};
  }

  _runClock() {
    const minuteHand = this.querySelector('#minute-hand');
    const secondHand = this.querySelector('#second-hand');
    const digitalText = this.querySelector('#digital-text');
    secondHand.setAttribute('transform',`rotate(${360/60 * this._time.getSeconds()})`);

    setInterval(_ => {
      this._time.setSeconds(this._time.getSeconds() + 1);
      const secDeg =  6 * this._time.getSeconds(); // 1 min 6 deg
      secondHand.setAttribute('transform',`rotate(${secDeg})`);
      if (secDeg === 360) {
        const minDeg = 6 * this._time.getMinutes(); 
        minuteHand.setAttribute('transform',`rotate(${minDeg})`);
      }
      digitalText.textContent = this._time;
    }, 1000);
  }
}

if (!customElements.get('x-clock')) {
  customElements.define('x-clock', XClock);
}
