import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularExtendedModule } from '../../../../lib/src';

@Component({
  template: `<h2>input</h2> <ax-input></ax-input>`,
  styles: [`<ax-input></ax-input>`]
})
export class InputComponent {}


@NgModule({
  declarations: [InputComponent],
  imports: [ AngularExtendedModule, FormsModule, CommonModule ]})
class DynModule {}