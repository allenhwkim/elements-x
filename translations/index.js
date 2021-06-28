import { en } from './en'; // eslint-disable-line no-unused-vars
import { kr } from './kr'; // eslint-disable-line no-unused-vars
import { XRoute, XInclude, Translation } from '../lib';

// this return route-specific translations
function getTranslationByRoute(route) {
  const lang = Translation.getLanguage();
  const allLang = {en, kr};
  const commonTranslations = allLang[lang].common;
  const routeTranslations = allLang[lang][route.src];
  return {...commonTranslations, ...routeTranslations};
}

function getPageTranslations(param) { // string or route;
  const src = typeof param === 'string' ? param : param.src; 
  const lang = Translation.getLanguage();
  const allLang = {en, kr};
  return allLang[lang]?.pageTranslations?.[src];
}

function setTranslationForRouteNInclude() {
  // When a full page translation is given, replace route.src
  XRoute.beforeFetchCallback = function(route) { 
    console.log('route before fetch', route);
    const page = getPageTranslations(route);
    page && (route.src = page);
    return route;
  };
  // XRoute.afterFetchCallback = function(html) { return html; };

  XInclude.beforeFetchCallback = function(src) { 
    console.log('x-include before fetch', src);
    const page = getPageTranslations(src);
    return src;
  };
  // XInclude.afterFetchCallback = function(html) { return html; };
}

Translation.en = en.common;
Translation.kr = kr.common;

export {
  en,
  kr,
  setTranslationForRouteNInclude
};