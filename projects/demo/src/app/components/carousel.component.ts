import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementsExtendedModule } from '../../../../lib/src';

@Component({
  template: `
  <h2>carousel</h2>

  <ee-carousel [selected]="2">
    <img class="img1" src="//picsum.photos/300/200?1">
    <img class="img2" src="//picsum.photos/300/200?2">
    <img class="img3" src="//picsum.photos/300/200?3">
    <img class="img4" src="//picsum.photos/300/200?4">
    <img class="img5" src="//picsum.photos/300/200?5">
    <img class="img6" src="//picsum.photos/300/200?6">
    <img class="img7" src="//picsum.photos/300/200?7">
    <img class="img8" src="//picsum.photos/300/200?8">
    <img class="img9" src="//picsum.photos/300/200?9">
  </ee-carousel>

  <pre>
  &lt;ee-carousel [selected]="2">
    &lt;img class="img1" src="//picsum.photos/300/200?1">
    &lt;img class="img2" src="//picsum.photos/300/200?2">
    &lt;img class="img3" src="//picsum.photos/300/200?3">
    &lt;img class="img4" src="//picsum.photos/300/200?4">
    &lt;img class="img5" src="//picsum.photos/300/200?5">
    &lt;img class="img6" src="//picsum.photos/300/200?6">
    &lt;img class="img7" src="//picsum.photos/300/200?7">
    &lt;img class="img8" src="//picsum.photos/300/200?8">
    &lt;img class="img9" src="//picsum.photos/300/200?9">
  &lt;/ee-carousel>
  </pre>
  `,
  styles: [`
  ee-carousel {
    width: 100%;
    overflow: auto;
  }`]
})
export class CarouselComponent {}

@NgModule({
  declarations: [CarouselComponent],
  imports: [ ElementsExtendedModule, FormsModule, CommonModule ]})
class DynModule {}

