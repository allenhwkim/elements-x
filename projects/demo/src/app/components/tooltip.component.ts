import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularExtendedModule } from '../../../../lib/src';

@Component({
  template: `<h2>tooltip</h2>  <ax-tooltip></ax-tooltip>`,
  styles: [`<ax-tooltip></ax-tooltip>`]
})
export class TooltipComponent {}


@NgModule({
  declarations: [TooltipComponent],
  imports: [ AngularExtendedModule, FormsModule, CommonModule ]})
class DynModule {}