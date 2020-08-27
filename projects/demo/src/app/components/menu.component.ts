import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularExtendedModule } from '../../../../lib/src';

@Component({
  template: `<h2>menu</h2> <ee-menu></ee-menu>`,
  styles: [`<ee-menu></ee-menu>`]
})
export class MenuComponent {}

@NgModule({
  declarations: [MenuComponent],
  imports: [ AngularExtendedModule, FormsModule, CommonModule ]})
class DynModule {}
