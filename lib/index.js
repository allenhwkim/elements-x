// import './common/native.shim';
import { XButton } from './button';
import { XCalendar } from './calendar';
import { XCarousel } from './carousel';
import { XClock } from './clock';
import { XColorPicker } from './color-picker';
import { XDiv } from './div';
import { XHttp } from './http';
import { XFormat } from './format';
import { XInput } from './input';
import { XMapbox } from './mapbox';
import { XOpenLayers, XOLMarker } from './openlayers';
import { XOverlay } from './overlay';
import { XPagination } from './pagination';
import { XPre } from './pre';
import { XRoute } from './route';
import { XInclude } from './include';
import { XSelect } from './select';
import { XTable } from './table';
import { XTabs } from './tabs';
import { XTooltip } from './tooltip';
import { XUl } from './ul';
import { addSnackbar, XSnackbar } from './snackbar';
import { openDialog, XDialog } from './dialog';
import { XAccordion } from './accordion';
import { XClipboard } from './clipboard';
import { XFlag } from './flag';
import { XQRCode } from './qrcode';
import { XBarcode } from './barcode';
import { XTypingEffect } from './typing-effect';
import { XAce } from './ace';
import { XHighlightjs } from './highlightjs';
import { XSidebar } from './sidebar';
import { XTranslation, XTranslationElement, XTranslationAttrElement } from './translation';
import { XListeners } from './listeners';
import { addCss, elementsXCss } from './common';

export {XMapbox, XButton, XClock, XDialog, XDiv, XHttp, XInput, XPagination};
export {XSnackbar, XFormat, XTooltip, XTabs, XUl, XCalendar, XCarousel, XColorPicker };
export {XRoute, XInclude, XPre, XOverlay, XTable, XSelect};
export {XAccordion, XQRCode, XBarcode, XClipboard, XFlag, XTypingEffect};
export {XAce, XHighlightjs, XOpenLayers, XOLMarker, XSidebar, XListeners};
export {XTranslation, openDialog, addSnackbar};

export function defineAll() {
  // add common css
  if (!document.querySelector(`style[elements-x]`)) {
    const styleEl = document.createElement('style');
    styleEl.setAttribute('elements-x','');
    styleEl.appendChild(document.createTextNode(elementsXCss));
    document.head.appendChild(styleEl);
  }
  
  // define each custom element
  [
    XMapbox, XButton, XClock, XDialog, XDiv, XHttp, XInput, XPagination,
    XSnackbar, XFormat, XTooltip, XTabs, XUl, XCalendar, XCarousel, XColorPicker,
    XRoute, XInclude, XPre, XOverlay, XTable, XSelect,
    XAccordion, XQRCode, XBarcode, XClipboard, XFlag, XTypingEffect,
    XAce, XHighlightjs, XOpenLayers, XOLMarker, XSidebar, XListeners,
    XTranslationElement, XTranslationAttrElement
  ].forEach(el => el.define());
}
