import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementsExtendedModule } from '../../../../lib/src';

@Component({
  template: `<h2>currency</h2> <ee-currency></ee-currency>`,
  styles: [`<ee-currency></ee-currency>`]
})
export class CurrencyComponent {}

@NgModule({
  declarations: [CurrencyComponent],
  imports: [ ElementsExtendedModule, FormsModule, CommonModule ]})
class DynModule {}

