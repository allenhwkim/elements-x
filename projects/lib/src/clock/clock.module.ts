import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockComponent } from './clock.component';
// import { OverlayComponent } from './overlay.component';

@NgModule({
  // declarations: [ClockComponent, OverlayComponent],
  declarations: [ClockComponent],
  imports: [CommonModule],
  exports: [ClockComponent]
})
export class ClockModule { }
