import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementsXModule } from '../../../../lib/src';

@Component({
  template: `
  Elements-Extended offers a wide variety of UI elementds based on the following principle.

  <ul>
    <li>Minimal property settings to element</li>
    <li>Minimal event dispatch from element</li>
    <li>Allow imports by component-level</li>
    <li>Allow custom style</li>
    <li>Small code, very small.</li>
    <li>Custom elements friendly</li>
  </ul>
  To do
  <li>x-pagination</li>
  <li>x-masked-input</li>
  <li>x-markdown</li>
  <li>x-inview: angular-in-view</li>
  <li>x-ace</li>
  `,
  styles: [``]
})
export class IndexComponent {}

@NgModule({
  declarations: [IndexComponent],
  imports: [ ElementsXModule, FormsModule, CommonModule ]})
class DynModule {}