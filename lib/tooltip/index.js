import { define } from '../common/util';
import { XOverlay } from '../overlay/index';
import css from './tooltip.css';

export class XTooltip extends XOverlay {
  constructor(...args) {
    const self = super(...args);
    self.triggerActions = 'focus, mouseenter, click';
    self.closeActions = 'blur, mouseleave';
    self.showArrow = true;
    self._css = css;
    return self;
  }
}
XTooltip.define = define('x-tooltip', XTooltip);
