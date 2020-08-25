import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { RippleModule } from '../ripple';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, RippleModule],
  exports: [ButtonComponent, RippleModule]
})
export class ButtonModule { }
