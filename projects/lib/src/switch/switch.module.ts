import { NgModule } from '@angular/core';
import { SwitchComponent } from './switch.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SwitchComponent],
  imports: [CommonModule],
  exports: [SwitchComponent]
})
export class SwitchModule { }
