import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularExtendedModule } from '../../../../lib/src';

@Component({
  template: `<h2>tabs</h2>  <ax-tabs></ax-tabs>`,
  styles: [`<ax-tabs></ax-tabs>`]
})
export class TabsComponent {}


@NgModule({
  declarations: [TabsComponent],
  imports: [ AngularExtendedModule, FormsModule, CommonModule ]})
class DynModule {}