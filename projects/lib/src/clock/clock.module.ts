import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockComponent } from './clock.component';
import { OverlayComponent as ClockOverlayComponent } from './overlay.component';

@NgModule({
  declarations: [ClockComponent, ClockOverlayComponent],
  imports: [CommonModule],
  exports: [ClockComponent]
})
export class ClockModule { }
