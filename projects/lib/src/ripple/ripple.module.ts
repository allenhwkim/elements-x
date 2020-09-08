import { NgModule } from '@angular/core';
import { RippleComponent, RippleDirective } from './ripple.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RippleComponent, RippleDirective],
  imports: [CommonModule],
  exports: [RippleComponent, RippleDirective]
})
export class RippleModule { }
