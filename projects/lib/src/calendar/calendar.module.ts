import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
// import { OverlayComponent } from './overlay.component';

@NgModule({
  // declarations: [CalendarComponent, OverlayComponent],
  declarations: [CalendarComponent],
  imports: [CommonModule],
  exports: [CalendarComponent]
})
export class CalendarModule { }
