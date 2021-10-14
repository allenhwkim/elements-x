// translation by route url
import { common } from './common.js';
import { translation } from './components/translation/route-translation';

const path = '/translations/kr';

export const pageTranslations = {
  '/app-components-intro.html': `${path}/app-components-intro.html`,
  '/components/button': `${path}/components/button.html`,
  'components/input/types/checkbox.html': `${path}/components/input/types/checkbox.html`,
  'components/input/types/color.html': `${path}/components/input/types/color.html`,
  'components/input/types/date.html': `${path}/components/input/types/date.html`,
  'components/input/types/file.html': `${path}/components/input/types/file.html`,
  'components/input/types/radio.html': `${path}/components/input/types/radio.html`,
  'components/input/types/switch.html': `${path}/components/input/types/switch.html`,
  'components/input/types/text.html': `${path}/components/input/types/text.html`,
  'components/input/types/time.html': `${path}/components/input/types/time.html`,
  'components/input/types/mask.html': `${path}/components/input/types/mask.html`,
  '/components/calendar': `${path}/components/calendar.html`,
  '/components/carousel': `${path}/components/carousel.html`,
  '/components/clock': `${path}/components/clock.html`,
  '/components/color-picker': `${path}/components/color-picker.html`,
  '/components/select': `${path}/components/select.html`,
  '/components/format': `${path}/components/format.html`,
  '/components/table': `${path}/components/table/index.html`,
  '/components/ul': `${path}/components/ul.html`,
  '/components/div': `${path}/components/div.html`,
  '/components/mapbox': `${path}/components/mapbox.html`,
  '/components/tabs': `${path}/components/tabs.html`,
  '/components/tooltip': `${path}/components/tooltip.html`,
  '/components/dialog': `${path}/components/dialog.html`,
  '/components/overlay': `${path}/components/overlay.html`,
  '/components/pagination': `${path}/components/pagination.html`,
  '/components/http': `${path}/components/http.html`,
  '/components/route': `${path}/components/route/index.html`,
  '/components/snackbar': `${path}/components/snackbar.html`,
  '/components/translation': `${path}/components/translation/index.html`,
};

export const kr = {
  common,
  '/components/translation': translation,
  pageTranslations
};