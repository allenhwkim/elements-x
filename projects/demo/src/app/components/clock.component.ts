import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularExtendedModule } from '../../../../lib/src';

@Component({
  template: `
  <h2>ee-clock</h2>

  <h3>Inputs</h3>
  <li><b>hour</b>: 0 to 24</li>
  <li><b>minute</b>: 0 to 59</li>
  
  <h3>Outputs</h3>
  <li><b>time-selected</b>: a custom event. selected time is in event.detail</li>
  
  <h3>Instruction</h3>
  <p>
    Press tab to select hour or miniute to update. Then, press arrow keys; up/down/left/right to update time our minutes
  </p>
  <p>
    Or, drag hour or minute hand to adjust time.
  </p>
  
  <ee-clock></ee-clock>
  <pre> &lt;ee-clock>&lt;/ee-clock> </pre>
  
  <h3>Used with input</h3>
  <input id="time" [ngModel]="time"/>
  <ee-clock hour="10" minute="9" start-by="time"
    (time-selected)="timeSelected($event)"></ee-clock>
  <div>Time: {{time | date:'HH:mm a'}}</div>
  
  
  <h3>Custom Design</h3>
  TODO
  <hr style="height: 600px" />`,
  styles: [`
  `]
})
export class ClockComponent {
  time;
  timeSelected(event) {
    this.time = event.detail;
  }
}

@NgModule({
  declarations: [ClockComponent],
  imports: [ AngularExtendedModule, FormsModule, CommonModule ]})
class DynModule {}

