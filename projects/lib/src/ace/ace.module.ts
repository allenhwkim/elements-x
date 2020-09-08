import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AceDirective } from './ace.directive';
// import { RippleModule } from '../ripple/ripple.module';

@NgModule({
  declarations: [AceDirective],
  imports: [CommonModule],
  exports: [AceDirective]
})
export class AceModule { }
