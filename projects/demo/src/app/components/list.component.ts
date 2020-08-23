import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularExtendedModule } from '../../../../lib/src';

@Component({
  template: `<h2>list</h2><ax-list></ax-list>`,
  styles: [`<ax-list></ax-list> `]
})
export class ListComponent {}


@NgModule({
  declarations: [ListComponent],
  imports: [ AngularExtendedModule, FormsModule, CommonModule ]})
class DynModule {}