import { NgModule } from '@angular/core';
import { TabsComponent } from './tabs.component';
import { CommonModule } from '@angular/common';
import { RippleModule } from '../ripple';

@NgModule({
  declarations: [TabsComponent],
  imports: [CommonModule],
  exports: [TabsComponent, RippleModule]
})
export class TabsModule { }
