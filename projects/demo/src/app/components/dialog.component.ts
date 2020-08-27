import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularExtendedModule } from '../../../../lib/src';

@Component({
  template: `<h2>dialog</h2><ee-dialog></ee-dialog>`,
  styles: [`<ee-dialog></ee-dialog> `]
})
export class DialogComponent {}

@NgModule({
  declarations: [DialogComponent],
  imports: [ AngularExtendedModule, FormsModule, CommonModule ]})
class DynModule {}