import { NgModule } from '@angular/core';
import { TextFieldComponent } from './text-field.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TextFieldComponent],
  imports: [CommonModule],
  exports: [TextFieldComponent]
})
export class TextFieldModule { }
