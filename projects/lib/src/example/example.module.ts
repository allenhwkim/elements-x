import { NgModule } from '@angular/core';
import { ExampleComponent } from './example.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ExampleComponent],
  imports: [CommonModule],
  exports: [ExampleComponent]
})
export class ExampleModule { }
