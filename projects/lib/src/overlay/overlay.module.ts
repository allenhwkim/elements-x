import { NgModule } from '@angular/core';
import { OverlayComponent } from './overlay.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [OverlayComponent],
  imports: [CommonModule],
  exports: [OverlayComponent]
})
export class OverlayModule { }
