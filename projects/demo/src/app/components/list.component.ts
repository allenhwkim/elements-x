import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementsXModule } from '../../../../lib/src';

@Component({
  template: `<h2>list</h2><ee-list></ee-list>`,
  styles: [`<ee-list></ee-list> `]
})
export class ListComponent {}


@NgModule({
  declarations: [ListComponent],
  imports: [ ElementsXModule, FormsModule, CommonModule ]})
class DynModule {}