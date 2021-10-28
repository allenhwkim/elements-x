import { en } from './en'; // eslint-disable-line no-unused-vars
import { kr } from './kr'; // eslint-disable-line no-unused-vars
import { XRoute, XInclude, XTranslation } from '../../lib';

// this return route-specific translations
function setRouteTranslations(route) {
  const lang = XTranslation.getLanguage();
  const allLang = {en, kr};
  const commonTranslations = allLang[lang].common;
  const routeTranslations = allLang[lang][route.src];
  XTranslation[lang] = {...commonTranslations, ...routeTranslations};
}

function getPageTranslations(param) { // string or route;
  const src = typeof param === 'string' ? param : param.src; 
  const lang = XTranslation.getLanguage();
  const allLang = {en, kr};
  // console.log({src});
  return allLang[lang]?.pageTranslations?.[src];
}

function setTranslationForRouteNInclude() {
  // When a full page translation is given, replace route.src
  XRoute.beforeFetchCallback = function(route) { 
    // console.log('route before fetch', route);
    setRouteTranslations(route);

    const page = getPageTranslations(route);
    page && (route.src = page);
    return route;
  };
  // XRoute.afterFetchCallback = function(html) { return html; };

  XInclude.beforeFetchCallback = function(src) { 
    // console.log('x-include before fetch', src);
    const page = getPageTranslations(src);
    return page;
  };
  // XInclude.afterFetchCallback = function(html) { return html; };
}

XTranslation.en = en.common;
XTranslation.kr = kr.common;

export {
  en,
  kr,
  setTranslationForRouteNInclude
};