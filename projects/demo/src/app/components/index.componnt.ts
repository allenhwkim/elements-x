import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementsExtendedModule } from '../../../../lib/src';

@Component({
  template: `
  Elements-Extended offers a wide variety of UI elementds based on the following principle.

  <ul>
    <li>Max 3 properties per element</li>
    <li>Max 2 events per element</li>
    <li>Overridable style.</li>
    <li>Small code. max 200 lines.</li>
    <li>Developed with Angular, exported as custom element</li>
  </ul>
  `,
  styles: [``]
})
export class IndexComponent {}

@NgModule({
  declarations: [IndexComponent],
  imports: [ ElementsExtendedModule, FormsModule, CommonModule ]})
class DynModule {}