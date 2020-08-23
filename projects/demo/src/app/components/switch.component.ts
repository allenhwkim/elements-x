import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularExtendedModule } from '../../../../lib/src';

@Component({
  template: `<h2>switch</h2> <ax-switch></ax-switch>`,
  styles: [`<ax-switch></ax-switch>`]
})
export class SwitchComponent {}



@NgModule({
  declarations: [SwitchComponent],
  imports: [ AngularExtendedModule, FormsModule, CommonModule ]})
class DynModule {}