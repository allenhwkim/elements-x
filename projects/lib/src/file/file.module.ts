import { NgModule } from '@angular/core';
import { FileComponent } from './file.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FileComponent],
  imports: [CommonModule],
  exports: [FileComponent]
})
export class FileModule { }
