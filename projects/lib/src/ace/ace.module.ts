import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AceDirective } from './ace.directive';
import { RippleModule } from '../ripple';

@NgModule({
  declarations: [AceDirective],
  imports: [CommonModule],
  exports: [AceDirective, RippleModule]
})
export class AceModule { }
