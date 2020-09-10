import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { OverlayComponent as CalendarOverlayComponent } from './overlay.component';

@NgModule({
  declarations: [CalendarComponent, CalendarOverlayComponent],
  imports: [CommonModule],
  exports: [CalendarComponent]
})
export class CalendarModule { }
