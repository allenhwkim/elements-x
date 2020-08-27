import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularExtendedModule } from '../../../../lib/src';

@Component({
  template: `<h2>Text Field</h2>  <ee-text-field></ee-text-field>`,
  styles: [``]
})
export class TextFieldComponent {}


@NgModule({
  declarations: [TextFieldComponent],
  imports: [ AngularExtendedModule, FormsModule, CommonModule ]})
class DynModule {}