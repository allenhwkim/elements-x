import { XCalendar } from './calendar';
import { XCarousel } from './carousel';
import { XClock } from './clock';
import { XColorPicker } from './color-picker';
import { XFormat, format } from './format';
import { XInput } from './input';
import { XOpenLayers, XOLMarker } from './openlayers';
import { XPagination } from './pagination';
import { XPre } from './pre';
import { XRoute } from './route';
import { XInclude } from './include';
import { XSelect } from './select';
import { XTabs } from './tabs';
import { XUl } from './ul';
import { XAccordion } from './accordion';
import { XClipboard } from './clipboard';
import { XFlag } from './flag';
import { XQRCode } from './qrcode';
import { XBarcode } from './barcode';
import { XTypingEffect } from './typing-effect';
import { XAce } from './ace';
import { XHighlightjs } from './highlightjs';
import { XListeners } from './listeners';
import { addCss } from './common';

import { showAlert } from './alert';
import { showMessage } from './message';
import { showOverlay, hideOverlay } from './overlay';
import { buttonCss, tooltipCss, overlayCss, commonCss, tableCss } from './_css-only';

export {XClock, XInput, XPagination};
export {XFormat, XTabs, XUl, XCalendar, XCarousel, XColorPicker };
export {XRoute, XInclude, XPre, XSelect};
export {XAccordion, XQRCode, XBarcode, XClipboard, XFlag, XTypingEffect};
export {XAce, XHighlightjs, XOpenLayers, XOLMarker, XListeners};
export * from './common';

export const elementsX = {
  showAlert, // close by user
  showMessage, // close automatically
  showOverlay,
  hideOverlay,
  format,
  defineAll: () => { 
    [
      XClock, XInput, XPagination,
      XFormat, XTabs, XUl, XCalendar, XCarousel, XColorPicker,
      XRoute, XInclude, XPre, XSelect,
      XAccordion, XQRCode, XBarcode, XClipboard, XFlag, XTypingEffect,
      XAce, XHighlightjs, XOpenLayers, XOLMarker, XListeners,
    ].forEach(el => el.define());

    addCss({tagName: 'elements-x'}, commonCss + buttonCss + tooltipCss + overlayCss + tableCss);
  }
}