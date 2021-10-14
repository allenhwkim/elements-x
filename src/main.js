import { XMapbox, XTranslation, debounce, defineElementsX, addSnackbar, openDialog } from '../lib';
import { setTranslationForRouteNInclude } from './translations';

defineElementsX(); // define all custom elements
window.addSnackbar = addSnackbar;
window.openDialog = openDialog;

import {defineCustomElements} from './custom-elements';
defineCustomElements();

XMapbox.accessToken = 'pk.eyJ1IjoiYWxsZW5od2tpbSIsImEiOiJja21ydzdiZXUwYnprMnBwZjBoaml1MjJvIn0.YFuQaFPaHsd-NQhU002DCw';

window.$ = document.querySelector.bind(document);

setTranslationForRouteNInclude();

// enable/disable outline for click and tab
document.body.addEventListener('click', 
  e => document.body.classList.remove('a11y-outline') );
document.body.addEventListener('keydown', 
  e => (e.key === 'Tab') && document.body.classList.add('a11y-outline') );

// Google analytics and adsense
window.addEventListener('DOMContentLoaded', function() {
  if (window.location.hostname !== 'localhost') {
    [ 
      { src: 'https://www.googletagmanager.com/gtag/js?id=G-5EB3NQZC8W', async: '' },
      { src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', async: '', 'data-ad-client': 'ca-pub-4555199270235339'}
    ].forEach( function addScriptEl(el) {
      var script = document.createElement('script');
      for(var key in el) { script[key] = el[key]; }
      document.head.appendChild(script);
    });
    setTimeout(function() {
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-5EB3NQZC8W');
    }, 1000);
  }

  /** 
   * disabling facebook comments because of error in console
   * ErrorUtils caught an error: Params: 113 [Caught in: Module "VisibilityListener"]
   */
  enableFacebookComments();
  document.body.addEventListener('x-route', function(event) {
    const title = event.detail.state.urlPath?.replace(/\//g, ' ');
    document.title = 'Custom ' + (title || 'Elements');
  });
});
 
function enableFacebookComments() {
  if (window.location.hostname.startsWith('localhost')) return;
  if (window.innerWidth < 768) return;

  const locale = XTranslation.getLanguage() === 'kr' ? 'ko_KR' : 'en_US';
  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('defer', '');
  script.setAttribute('crossorigin', 'anonymous');
  script.setAttribute('nonce', 'qRsDD5xh');
  script.setAttribute('src', `https://connect.facebook.net/${locale}/sdk.js#xfbml=1&version=v9.0&appId=254907754864724`);
  setTimeout(_ => document.body.appendChild(script), 2000);

  document.body.addEventListener('x-route', function() {
    $('.fb-comments').style.display = 'none'; // to avoid flicking
    debounce(event => {
      const iframe = $('.fb-comments iframe'); 
      if (iframe) {
        const href = window.location.href.replace(window.location.search, '');
        const iframeSrc = iframe.getAttribute('src')
          .replace(/&href=[^&]+/, `&href=${encodeURIComponent(href)}`);
        iframe.setAttribute('src', iframeSrc);
      }
      $('.fb-comments').style.display = 'block';
    }, 5000)();
  });
}