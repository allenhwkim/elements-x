import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementsExtendedModule } from '../../../../lib/src';

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
  <li>pagination</li>
  <li>masked input</li>
  <li>markdown</li>
  `,
  styles: [``]
})
export class IndexComponent {}

@NgModule({
  declarations: [IndexComponent],
  imports: [ ElementsExtendedModule, FormsModule, CommonModule ]})
class DynModule {}