
import { addCss, removeCss } from '../../util';
import html from './clock.html';
import * as cssM from './clock.css?inline';
const css = cssM.default;

function getTime(timezone: string, time: Date) {
  const str = new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short', timeZone: timezone}).format(time);
  return new Date(str);
}

export class Clock extends HTMLElement {
  run = false;
  time: Date = new Date();
  timezone = undefined;

  static get observedAttributes() { return ['hour', 'minute', 'timezone', 'run'] }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    if (oldValue !== newValue) {
      (name === 'hour') && this.time.setHours(+newValue);
      (name === 'minute') && this.time.setMinutes(+newValue);
      (name === 'run') && (this.run = true);
      if (name === 'timezone') {
        const now = new Date();
        const dateStr = new Intl.DateTimeFormat('fr-CA', {dateStyle: 'short', timeZone: newValue}).format(now);
        const timeStr = new Intl.DateTimeFormat('en-US', {timeStyle: 'medium', timeZone: newValue}).format(now);
        this.time = new Date(`${dateStr} ${timeStr}`);
      }
      this.#updateDOM();
    }
  }

  disconnectedCallback() {
    removeCss(this.tagName);
  }

  connectedCallback() {
    addCss(this.tagName, css);
    this.innerHTML = html;
    this.#updateDOM();
  }

  #timer: any;
  #updateDOM() { 
    clearTimeout(this.#timer);
    this.#timer = setTimeout(async () => { 
      this.updateHourHand(this.time);
      this.updateMinuteHand(this.time);
      this.runClock(this.time);
    }, 50);
  }

  updateHourHand(time: Date) {
    const [hour, min] = [time.getHours(), time.getMinutes()];
    const hourDeg = ((hour % 12) * 60) / 2; 
    const minDeg = (min/60) * (360/12); // 1 hour 30 deg
    const deg = hourDeg + minDeg;
    const hourHand = this.querySelector('#hour-hand') as HTMLElement;
    const digitalText = this.querySelector('#digital-text') as HTMLElement;
    const displayTime =
      time.toLocaleTimeString('en-US', {hour12: 0, hourCycle: 'h23'} as any).replace(/^24/,'00');

    hourHand.setAttribute('transform',`rotate(${deg})`);
    digitalText.textContent = displayTime;
  }

  updateMinuteHand(time: Date) {
    const min = time.getMinutes();
    const deg =  360/60 * min; // 1 min 6 deg
    const minuteHand = this.querySelector('#minute-hand') as HTMLElement;

    minuteHand.setAttribute('transform',`rotate(${deg})`);
  }

  runClock(time: Date) {
    if (!this.run) return;

    const minuteHand = this.querySelector('#minute-hand') as any;
    const secondHand = this.querySelector('#second-hand') as any;
    const digitalText = this.querySelector('#digital-text') as any;
    secondHand.setAttribute('transform',`rotate(${360/60 * time.getSeconds()})`);

    setInterval(_ => {
      time.setSeconds(time.getSeconds() + 1);
      const secDeg =  6 * time.getSeconds(); // 1 min 6 deg
      secondHand.setAttribute('transform',`rotate(${secDeg})`);
      if (secDeg === 0) {
        const minDeg = 6 * time.getMinutes(); 
        minuteHand.setAttribute('transform',`rotate(${minDeg})`);
      }
      const displayTime =
        time.toLocaleTimeString('en-US', {hour12: 0, hourCycle: 'h23'} as any).replace(/^24/,'00');
      digitalText.textContent = displayTime;
    }, 1000);
  }
}

