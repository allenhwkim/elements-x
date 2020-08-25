import { NgModule } from '@angular/core';
import { RippleDirective } from './ripple.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RippleDirective],
  imports: [CommonModule],
  exports: [RippleDirective]
})
export class RippleModule { }
