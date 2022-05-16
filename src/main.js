import { elementsX } from '../lib';
import { debounce } from '../lib/common/util';

elementsX.defineAll();

window.$ = document.querySelector.bind(document);

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

  document.body.addEventListener('x-route', function(event) {
    $('.sidebar').classList.remove('x-visible');
    const title = event.detail.state.urlPath?.replace(/\//g, ' ');
    document.title = 'Custom ' + (title || 'Elements');
  });
});
 