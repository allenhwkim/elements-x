// translation by route url
import { common } from './common.js';
import { translation } from './components/translation/route-translation';

const path = '/translations/kr';

export const pageTranslations = {
  '/src/app-components-intro.html': `${path}/app-components-intro.html`,
  '/components/button': `${path}/components/button`,
  'components/input/types/checkbox.html': `${path}/components/input/types/checkbox.html`,
  'components/input/types/color.html': `${path}/components/input/types/color.html`,
  'components/input/types/date.html': `${path}/components/input/types/date.html`,
  'components/input/types/file.html': `${path}/components/input/types/file.html`,
  'components/input/types/radio.html': `${path}/components/input/types/radio.html`,
  'components/input/types/switch.html': `${path}/components/input/types/switch.html`,
  'components/input/types/text.html': `${path}/components/input/types/text.html`,
  'components/input/types/time.html': `${path}/components/input/types/time.html`,
  'components/input/types/mask.html': `${path}/components/input/types/mask.html`,
  '/components/calendar': `${path}/components/calendar`,
  '/components/carousel': `${path}/components/carousel`,
  '/components/clock': `${path}/components/clock`,
  '/components/color-picker': `${path}/components/color-picker`,
  '/components/select': `${path}/components/select`,
  '/components/format': `${path}/components/format`,
  '/components/table': `${path}/components/table`,
  '/components/ul': `${path}/components/ul`,
  '/components/div': `${path}/components/div`,
  '/components/mapbox': `${path}/components/mapbox`,
  '/components/tabs': `${path}/components/tabs`,
  '/components/tooltip': `${path}/components/tooltip`,
  '/components/dialog': `${path}/components/dialog`,
  '/components/overlay': `${path}/components/overlay`,
  '/components/pagination': `${path}/components/pagination`,
  '/components/http': `${path}/components/http`,
  '/components/route': `${path}/components/route`,
  '/components/snackbar': `${path}/components/snackbar`,
  '/components/translation': `${path}/components/translation`,
};

export const kr = {
  common,
  '/components/translation': translation,
  pageTranslations
};