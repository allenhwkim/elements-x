import {AppCustomCss} from './app-custom-css';
import {AppGroupHeader} from './app-group-header';

export function defineCustomElements() {
  [
    AppGroupHeader, AppCustomCss
  ].forEach(el => el.define());
}

export {AppCustomCss, AppGroupHeader};