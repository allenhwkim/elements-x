// translation by route url
import { common } from './common.js';
import { translation } from './components/translation/route-translation';

const path = '/translations/kr';

export const pageTranslations = {
  'app-components-intro.html': `${path}/app-components-intro.html`,
  'components/button.html': `${path}/components/button.html`,
  'components/input/checkbox.html': `${path}/components/input/types/checkbox.html`,
  'components/input/color.html': `${path}/components/input/types/color.html`,
  'components/input/date.html': `${path}/components/input/types/date.html`,
  'components/input/file.html': `${path}/components/input/types/file.html`,
  'components/input/radio.html': `${path}/components/input/types/radio.html`,
  'components/input/switch.html': `${path}/components/input/types/switch.html`,
  'components/input/text.html': `${path}/components/input/types/text.html`,
  'components/input/time.html': `${path}/components/input/types/time.html`,
  'components/input/mask.html': `${path}/components/input/types/mask.html`,
  'components/calendar.html': `${path}/components/calendar.html`,
  'components/carousel.html': `${path}/components/carousel.html`,
  'components/clock.html': `${path}/components/clock.html`,
  'components/color-picker.html': `${path}/components/color-picker.html`,
  'components/select.html': `${path}/components/select.html`,
  'components/format.html': `${path}/components/format.html`,
  'components/table.html': `${path}/components/table/index.html`,
  'components/ul.html': `${path}/components/ul.html`,
  'components/div.html': `${path}/components/div.html`,
  'components/tabs.html': `${path}/components/tabs.html`,
  'components/tooltip.html': `${path}/components/tooltip.html`,
  'components/dialog.html': `${path}/components/dialog.html`,
  'components/openlayers.html': `${path}/components/openlayers.html`,
  'components/overlay.html': `${path}/components/overlay.html`,
  'components/pagination.html': `${path}/components/pagination.html`,
  'components/http.html': `${path}/components/http.html`,
  'components/route.html': `${path}/components/route/index.html`,
  'components/snackbar.html': `${path}/components/snackbar.html`,
  'components/translation.html': `${path}/components/translation/index.html`,
}

export const kr = {
  common,
  '/components/translation': translation,
  pageTranslations
};