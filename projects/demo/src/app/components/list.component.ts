import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementsExtendedModule } from '../../../../lib/src';

@Component({
  template: `<h2>list</h2><ee-list></ee-list>`,
  styles: [`<ee-list></ee-list> `]
})
export class ListComponent {}


@NgModule({
  declarations: [ListComponent],
  imports: [ ElementsExtendedModule, FormsModule, CommonModule ]})
class DynModule {}