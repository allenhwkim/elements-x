import { Directive, Component, HostListener } from '@angular/core';

function animate(drawFn, duration=500) {
  const timing = function(t) { return t };
  const start = performance.now();
  return new Promise(function(resolve) {
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      (timeFraction > 1) && (timeFraction = 1);
      drawFn(timing(timeFraction));
      timeFraction < 1 ? requestAnimationFrame(animate) : resolve(true);
    });
  });
}

@Directive({selector: '[ripple]'})
export class RippleDirective {
  @HostListener('click', ['$event', '$event.currentTarget'])
  click(event, element) {
    const ripple = this.addRipple(event, element);
    animate(pct => {
      ripple.style.transform = `scale(${pct * 3})`;
      ripple.style.opacity = `${1.5 - pct}`;
    }).then(_ => {
      ripple.remove();
      if (!element.querySelector('.ripple')) { // if no ripple found
        element.style.removeProperty('position'); // remove element style
        element.style.removeProperty('overflow');
      }
    });
  }

  addRipple(event, element) {
    Object.assign(element.style, {position: 'relative', overflow: 'hidden'});
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();

    const radius = Math.max(rect.height, rect.width);
    const left = 
      event.pageX - rect.left - radius/2 - window.scrollX; // document.body.scrollLeft;
    const top = 
      event.pageY - rect.top - radius/2 - window.scrollY; // document.body.scrollTop;

    Object.assign(ripple.style, {
      cursor: 'pointer',
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.16)',
      borderRadius: '100%',
      height: radius + 'px',
      width: radius + 'px',
      pointerEvents: 'none',
      left: left + 'px',
      top: top + 'px'
    });
    ripple.classList.add('ripple');
    element.appendChild(ripple);

    return ripple;
  }
}

@Component({
  selector: 'ee-ripple',
  template: '<ng-content></ng-content>'
})
export class RippleComponent extends RippleDirective {}