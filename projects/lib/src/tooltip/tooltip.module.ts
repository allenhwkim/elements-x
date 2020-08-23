import { NgModule } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TooltipComponent],
  imports: [CommonModule],
  exports: [TooltipComponent]
})
export class TooltipModule { }
