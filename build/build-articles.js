#!/usr/bin/env node
const fs = require('fs');
const MediumToHtml = require('./medium-to-html');

const allUrls = `
  https://medium.com/@allenhwkim/angular-build-code-editor-with-ace-2cec03b143fd
  https://medium.com/@allenhwkim/angular-make-div-tag-editable-37f90b35acbd
  https://medium.com/@allenhwkim/angular-not-a-fan-of-blue-focused-outline-6f883cc2dc92
  https://medium.com/@allenhwkim/angular-syntax-highlighted-code-with-prism-4b9fce7364dd
  https://medium.com/@allenhwkim/angular5-jest-unit-test-examples-a9538ece6cd
  https://medium.com/@allenhwkim/developers-love-to-hear-f25eaebf056b
  https://medium.com/@allenhwkim/firebase-crud-7d74d06d8c54
  https://medium.com/@allenhwkim/firebase-storage-crud-78f8d3bc1680
  https://medium.com/@allenhwkim/getting-started-intersection-observer-b13a77906731
  https://medium.com/@allenhwkim/git-how-to-rollback-pushed-changes-626a7ee42a08
  https://medium.com/@allenhwkim/how-to-fire-customevent-1b5ac9491652
  https://medium.com/@allenhwkim/introducing-touchui-c3957e9107
  https://medium.com/@allenhwkim/javascript-convert-string-to-object-value-without-eval-5011070397de
  https://medium.com/@allenhwkim/multiple-language-with-nuxt-vuejs-efc3dad45eac
  https://medium.com/@allenhwkim/nodejs-walk-directory-f30a2d8f038f
  https://medium.com/@allenhwkim/resolving-before-route-vuejs-d319b27576c3
  https://medium.com/@allenhwkim/routing-with-nuxt-vuejs-6dc90cba4b96
  https://medium.com/@allenhwkim/start-angular-library-with-jest-in-5-minutes-45e44c713107
  https://medium.com/@allenhwkim/vue-firebase-801fd37f7cc4
  https://medium.com/@allenhwkim/webpack-f4fde093c2c4
  https://medium.com/allenhwkim/angular-animate-with-ngif-ngfor-e39180201a48
  https://medium.com/allenhwkim/angular-build-a-calendar-in-50-lines-f813f0a04c3b
  https://medium.com/allenhwkim/angular-build-a-custom-password-field-472e60302b29
  https://medium.com/allenhwkim/angular-build-a-dropdown-menu-f4c65e74f610
  https://medium.com/allenhwkim/angular-build-tabs-with-no-js-7befac277afc
  https://medium.com/allenhwkim/angular-create-my-own-ngif-bb4fc534cbe
  https://medium.com/allenhwkim/angular-encrypt-decrypt-3583e8c84e73
  https://medium.com/allenhwkim/angular-monitor-element-is-in-viewport-after-scrolling-67f4d787647c
  https://medium.com/allenhwkim/angular-random-how-tos-61be27cac0a2
  https://medium.com/allenhwkim/angular-trap-focus-with-in-a-block-79b7572f23c2
  https://medium.com/allenhwkim/angular-watch-for-element-changes-made-to-dom-tree-bb92062fe5e9
  https://medium.com/allenhwkim/angular5-todo-list-side-by-side-comparison-for-ngrx-store-757b3332cc78
  https://medium.com/allenhwkim/animate-with-javascript-eef772f1f3f3
  https://medium.com/allenhwkim/ava-the-test-tool-that-works-5d98ee03933e
  https://medium.com/allenhwkim/building-a-carousel-in-angular-way-84d2c45baf02
  https://medium.com/allenhwkim/close-div-when-clicking-outside-it-97255c20a221
  https://medium.com/allenhwkim/dom-changed-event-using-mutationobserver-a2b2834dded6
  https://medium.com/allenhwkim/fake-it-until-make-it-mock-responses-9a9eb3361312
  https://medium.com/allenhwkim/generate-angular-unit-tests-automatically-1300601ed73
  https://medium.com/allenhwkim/getting-started-docker-on-mac-os-x-72c64670464a
  https://medium.com/allenhwkim/getting-started-mutationobserver-9d891239cf34
  https://medium.com/allenhwkim/how-to-build-a-calendar-widget-7cf397fe3de5
  https://medium.com/allenhwkim/how-to-build-a-carousel-in-pure-javascript-98d758a18811
  https://medium.com/allenhwkim/how-to-build-tabs-only-with-css-844718d7de2f
  https://medium.com/allenhwkim/how-to-parse-javascript-from-source-ffbc47b1183b
  https://medium.com/allenhwkim/how-to-parse-typescript-from-source-643387971f4e
  https://medium.com/allenhwkim/margin-collapsing-explained-6fefaf4f4c73
  https://medium.com/allenhwkim/mobile-friendly-table-b0cb066dbc0e
  https://medium.com/allenhwkim/modal-or-not-modal-3d65de64d82c
  https://medium.com/allenhwkim/react-vs-vue-6bb1481c6844
  https://medium.com/allenhwkim/simple-lazy-loading-with-angular-716dd3b174a
  https://medium.com/allenhwkim/team-building-guide-for-web-developers-b8261772c053
  https://medium.com/allenhwkim/why-not-modal-84d9f5d7c646
  https://medium.com/allenhwkim/you-clean-up-house-how-about-code-5a6177e2d385
  `.split('\n').map(el => el.trim()).filter(el => el);

// const urls = [`https://medium.com/allenhwkim/angular-create-my-own-ngif-bb4fc534cbe`, `https://medium.com/@allenhwkim/angular-make-div-tag-editable-37f90b35acbd`];
// const urls = [`https://medium.com/allenhwkim/angular-create-my-own-ngif-bb4fc534cbe`];
// const urls = [`https://medium.com/allenhwkim/angular-build-a-calendar-in-50-lines-f813f0a04c3b`];
// const urls = [ `https://medium.com/@allenhwkim/angular-not-a-fan-of-blue-focused-outline-6f883cc2dc92` ];
const urls = allUrls;
const med2html = new MediumToHtml();
const promises = urls.map(url => {
  return med2html.getHtml(url + '?format=json')
    .then(({json, html}) => {
      const {id, title, mediumUrl, uniqueSlug} = json.payload.value;
      const previewContent = json.payload.value.previewContent.bodyModel.paragraphs;
      const subtitle = json.payload.value.previewContent.subtitle;
      return {id, title, subtitle, mediumUrl, uniqueSlug, html, previewContent};
    });
});

Promise.all(promises).then(all => {
  const index = {};
  const targetDir = `src/articles`;
  all.forEach(el => {
    const {id, subtitle, title, mediumUrl, uniqueSlug, html, previewContent} = el;
    const previewHTML =  previewContent.map(p => {
      return MediumToHtml.processParagraph(p, title, subtitle, mediumUrl)
    }).join('');
    index[id] = {id, title, mediumUrl, uniqueSlug, previewHTML};
    const path  = `${targetDir}/${uniqueSlug}.html`;
    fs.writeFileSync(path, html);
    console.log('exported article', mediumUrl, 'to', path);
  })

  fs.writeFileSync(
    `${targetDir}/index.js`, 
    `export const articles = ` + JSON.stringify(index, null, '  ')
  );
})
