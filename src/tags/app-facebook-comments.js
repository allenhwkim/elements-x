import  {setCustomElementHTMLCss}  from '../../lib/common/util';
const html = `
  <div id="fb-root"></div>
  <script async defer crossorigin="anonymous"
    src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0&appId=254907754864724"
    nonce="qRsDD5xh"></script>
  <div class="fb-comments" data-href="${window.location.href}" data-width="100%" data-numposts="5"></div>
  <div class="facebook-comments"></div>
`;

class AppFacebookCommenets extends HTMLElement {

  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    setCustomElementHTMLCss(this, html)
      .then( _ => {
        document.body.addEventListener('x-route-change', this.resetComments.bind(this));
      });
  }

  resetComments(event) {
    const iframe = this.querySelector('iframe'); 
    if (iframe) {
      setTimeout(_ => {
        const href = window.location.href.replace(window.location.search, '');
        const iframeSrc = iframe.getAttribute('src')
          .replace(/&href=[^&]+/, `&href=${encodeURIComponent(href)}`);
        iframe.setAttribute('src', iframeSrc);
        console.log({href});
      }, 500);
    }
  }

}

if (!customElements.get('app-facebook-comments')) {
  customElements.define('app-facebook-comments', AppFacebookCommenets);
}

