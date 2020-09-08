import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementsXModule } from '../../../../lib/src';

@Component({
  template: `<h2>tooltip</h2>  <ee-tooltip></ee-tooltip>`,
  styles: [`<ee-tooltip></ee-tooltip>`]
})
export class TooltipComponent {}


@NgModule({
  declarations: [TooltipComponent],
  imports: [ ElementsXModule, FormsModule, CommonModule ]})
class DynModule {}