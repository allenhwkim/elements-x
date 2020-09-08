import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementsXModule } from '../../../../lib/src';

@Component({
  template: `
  articles index
  `,
  styles: [``]
})
export class IndexComponent {}

@NgModule({
  declarations: [IndexComponent],
  imports: [ ElementsXModule, FormsModule, CommonModule ]})
class DynModule {}