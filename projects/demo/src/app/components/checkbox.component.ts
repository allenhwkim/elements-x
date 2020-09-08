import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementsXModule } from '../../../../lib/src';

@Component({
  template: `
  <h2>ee-checkbox</h2>

  <h3>Inputs</h3>
    <li>icon </li>
    <li>border </li>
    <li>fill </li>
    <li>size </li>
    <li>color </li>
  
  <div>
    <div class="demo">
      <h3>Default</h3>
      <label>
        <input type="checkbox" checked ee-checkbox />
        Check here 
      </label>
    </div>
    <pre>
&lt;label>
  &lt;input type="checkbox" checked ee-checkbox />
  Check here 
&lt;/label>
    </pre>
  </div>

  <div>
    <h3>Styled</h3>
    <label>
      <ee-checkbox fill="blue" icon="✖" size="24px">
        <input checked type="checkbox" />
      </ee-checkbox>
      Check here 
    </label>
    <pre>
&lt;label>
  &lt;ee-checkbox fill="blue" icon="✖" size="24px">
    &lt;input checked type="checkbox"/>
  &lt;/ee-checkbox>
  Check here 
&lt;/label>
    </pre>
  </div>
  
  <div>
    <div class="demo">
      <h3>Disabled</h3>
      <label>
        <input disabled type="checkbox" ee-checkbox checked />
        Check here 
      </label>
    </div>
    <pre>
&lt;label>
  &lt;input disabled type="checkbox" ee-checkbox />
  Check here 
&lt;/label>
    </pre>
  </div>
  `,
  styles: [``]
})
export class CheckboxComponent {}

@NgModule({
  declarations: [CheckboxComponent],
  imports: [ ElementsXModule, FormsModule, CommonModule ]})
class DynModule {}

