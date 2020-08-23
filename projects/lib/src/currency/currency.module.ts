import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyComponent } from './currency.component';

@NgModule({
  declarations: [CurrencyComponent],
  imports: [CommonModule],
  exports: [CurrencyComponent]
})
export class CurrencyModule { }
