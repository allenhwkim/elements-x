import { XOverlay } from '../overlay/index';
import css from './tooltip.css';

class XTooltip extends XOverlay {
  constructor(...args) {
    const self = super(...args);
    self.triggerActions = 'focus, mouseenter, click';
    self.closeActions = 'blur, mouseleave';
    self.showArrow = true;
    self._css = css;
    return self;
  }
}

if (!customElements.get('x-tooltip')) {
  customElements.define('x-tooltip', XTooltip);
}
  