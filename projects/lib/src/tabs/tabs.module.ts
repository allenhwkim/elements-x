import { NgModule } from '@angular/core';
import { TabsComponent } from './tabs.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TabsComponent],
  imports: [CommonModule],
  exports: [TabsComponent]
})
export class TabsModule { }
