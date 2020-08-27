import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RippleModule } from '../../../../lib/src';

@Component({
  template: `<h2>ripple</h2>`,
  styles: [`<ee-ripple></ee-ripple> `]
})
export class RippleComponent {}

@NgModule({
  declarations: [RippleComponent],
  imports: [ RippleModule, FormsModule, CommonModule ]})
class DynModule {}