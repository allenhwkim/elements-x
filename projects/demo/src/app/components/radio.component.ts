import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularExtendedModule } from '../../../../lib/src';

@Component({
  template: `<h2>radio</h2> <ee-radio></ee-radio>`,
  styles: [`<ee-radio></ee-radio> `]
})
export class RadioComponent {}


@NgModule({
  declarations: [RadioComponent],
  imports: [ AngularExtendedModule, FormsModule, CommonModule ]})
class DynModule {}