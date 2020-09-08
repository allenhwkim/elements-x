import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementsXModule } from '../../../../lib/src';

@Component({
  template: `
  Tools
  <li> Special Characters - https://unichar.app/web/#searchRow</li>
  <li> unicode <-> Braille https://en.wikipedia.org/wiki/Braille_ASCII
  https://en.wikipedia.org/wiki/Miscellaneous_Symbols
  </li>
  <li> URL Encoding / Decoding
 /   https://yoksel.github.io/url-encoder/
  </li>
  <li> image url to base64 - https://www.base64-image.de/ </li>
  <li> JSON formatter(prettier)</li>
  <li> HTML formatter(prettier)</li>
  <li> SCSS formatter</li>
  <li> https://stackblitz.com/edit/to-locale-date-string </li>
  <li> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat </li>
  Flexbox.help 
  `,
  styles: [``]
})
export class IndexComponent {}

@NgModule({
  declarations: [IndexComponent],
  imports: [ ElementsXModule, FormsModule, CommonModule ]})
class DynModule {}