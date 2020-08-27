import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularExtendedModule } from '../../../../lib/src';

@Component({
  template: `<h2>switch</h2> <ee-switch></ee-switch>`,
  styles: [`<ee-switch></ee-switch>`]
})
export class SwitchComponent {}



@NgModule({
  declarations: [SwitchComponent],
  imports: [ AngularExtendedModule, FormsModule, CommonModule ]})
class DynModule {}