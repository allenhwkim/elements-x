import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule } from '../../../../lib/src';

@Component({
  template: `
<p>
Tabs shows only the selected tab contents when selected.
To select the tab when initialized, set value of "selected" attribute.
</p>

<p>
Use the selected structure as described in css selector to make tabs work.
</p>
<pre>
  *.tabs[selected=&lt;TAB-ID>]
    *[tab-for=&lt;TAB-ID>][disabled]
  *.tab-contents
    *[contents-for=&lt;TABID>]

</pre>

<h3>Keyboard interaction</h3>
<p>
  <li>LEFT_ARROW	Select previous tab
  <li>RIGHT_ARROW	Select next tab
</p>

<div class="example">
  <ee-tabs>
    <div class="tabs" selected="tab2">
      <div tab-for="tab1" ripple> TAB1 </div>
      <div tab-for="tab2" ripple> TAB2 </div>
      <div tab-for="tab3" ripple disabled> DISABLED </div>
      <div class="underline-bar"></div>
    </div>
    <div class="tab-contents">
      <div contents-for="tab1">Contents for TAB1</div>
      <div contents-for="tab2">Contents for TAB2</div>
      <div contents-for="tab3">Contents for DISABLED</div>
    </div>
  </ee-tabs>
  <pre>
  &lt;ee-tabs>
    &lt;div class="tabs" selected="tab2">
      &lt;div tab-for="tab1" ripple> TAB1 &lt;/div>
      &lt;div tab-for="tab2" ripple> TAB2 &lt;/div>
      &lt;div tab-for="tab3" ripple disabled> DISABLED &lt;/div>
      &lt;div class="underline-bar">&lt;/div>
    &lt;/div>
    &lt;div class="tab-contents">
      &lt;div contents-for="tab1">Contents for TAB1&lt;/div>
      &lt;div contents-for="tab2">Contents for TAB2&lt;/div>
      &lt;div contents-for="tab3">Contents for DISABLED&lt;/div>
    &lt;/div>
  &lt;/ee-tabs>
  </pre>
</div>

`,
  styles: [``]
})
export class TabsComponent {
  els = [
    {id: 'tab1', contents: 'this is tab1'},
    {id: 'tab2', contents: 'this is tab2'},
    {id: 'tab3', contents: 'this is disabled', disabled: true},
    {id: 'tab4', contents: 'this is tab4'}
  ]
}

@NgModule({
  declarations: [TabsComponent],
  imports: [ TabsModule, FormsModule, CommonModule ]})
class DynModule {}