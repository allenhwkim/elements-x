import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule, PrismModule, AceModule } from '../../../../lib/src';
import { CustomCssComponent } from './custom-css.component';

export const usage = {
  template: `
    <div class="custom">
      <ee-button class="ripple primary"> Primary </ee-button>
      <ee-button class="ripple accent"> Accent </ee-button>
      <ee-button disabled> Disabled </ee-button>
    </div>`,
  style: `
    ee-button {
      --primary: green;
      --accent: orange;L:
      --disabled: grey;
      --size: 32px;
    }`
};

@Component({
  template: `
<custom-css>
  ee-button {{'{'}}
    --primary: green;
    --accent: orange;
    --disabled: grey;
    --size: 32px;
  }
</custom-css>

<li> When clicked, button become automatically disabled for a second to prevent double click </li>
<li> Able to show loading sign setting loading class </li>
<li> Customizable color and button size(height) </li>
<h3>Default</h3>
<div class="example">
  <p>
    <ee-button ripple class="ripple"> Default 
    <!--
    <span class="ripple" style="position: absolute; background-color: rgba(0, 0, 0, 0.16); border-radius: 100%; height: 86.1562px; width: 86.1562px; pointer-events: none; left: 10.9219px; top: 265.047px; transform: scale(1.06029); opacity: 0.469853;"></span>
    -->
    </ee-button>
    <ee-button class="ripple primary"> Primary </ee-button>
    <ee-button class="ripple accent"> Accent </ee-button>
    <ee-button disabled> Disabled </ee-button>
  </p>
  <pre language="html" ee-prism>
    &lt;ee-button> Default &lt;/ee-button>
    &lt;ee-button class="<b>primary</b>"> Primary &lt;/ee-button>
    &lt;ee-button class="<b>accent</b>"> Accent &lt;/ee-button>
    &lt;ee-button <b>disabled</b>> Disabled &lt;/ee-button>
  </pre>
</div>

<h3>Loading</h3>
<p>
  Any element with "loading" class is hidden in default.
  If the button class contains "loading" the loading sign become visible.
  While it is loading, users won't be able to click the button.
</p>

Click the below buttons to see loading sign.
<div class="example loading-section">
  <ee-button class="loading">
    <img class="loading" height="24" src="assets/loading.gif" />
    Default
  </ee-button>
  <ee-button class="primary loading"> 
    Primary
    <img class="loading" height="24" src="assets/loading.gif" />
  </ee-button>
  <ee-button class="accent loading">
    <img class="loading" height="24" src="assets/loading.gif" />
    Accent
  </ee-button>
  <pre language="html" ee-prism>
  &lt;ee-button  class="loading"">
    &lt;img class="loading" height="24" src="assets/loading.gif" />
    Default
  &lt;/ee-button>
  &lt;ee-button class="primary loading"> 
    Primary
    &lt;img class="loading" height="24" src="assets/loading.gif" />
  &lt;/ee-button>
  &lt;ee-button class="accent loading">
    &lt;img class="loading" height="24" src="assets/loading.gif" />
    Accent
  &lt;/ee-button>
  </pre>
</div>

<h3>no-bg</h3>
Button with "no-class" attribute won't have background color, switching to text color.

<div class="example custom">
  <ee-button class="no-bg"> Default </ee-button>
  <ee-button class="primary no-bg"> Primary </ee-button>
  <ee-button class="accent no-bg"> Accent </ee-button>
  <ee-button disabled class="no-bg"> Disabled </ee-button>
  <pre language="html" ee-prism>
  &lt;ee-button class="<b>no-bg</b>"> Default &lt;/ee-button>
  &lt;ee-button class="primary <b>no-bg</b>"> Primary &lt;/ee-button>
  &lt;ee-button class="accent <b>no-bg</b>"> Accent &lt;/ee-button>
  &lt;ee-button disabled class="<b>no-bg</b>"> Disabled &lt;/ee-button>
  </pre>
</div>

<h3>no-border</h3>
<div class="example">
  <ee-button class="no-bg no-border"> Default </ee-button>
  <ee-button class="primary no-bg no-border"> Primary </ee-button>
  <ee-button class="accent no-bg no-border"> Accent </ee-button>
  <ee-button disabled class="no-bg no-border"> Disabled </ee-button>
  <pre language="html" ee-prism>
  &lt;ee-button class="no-bg no-border"> Default &lt;/ee-button>
  &lt;ee-button class="primary no-bg no-border"> Primary &lt;/ee-button>
  &lt;ee-button class="accent no-bg no-border"> Accent &lt;/ee-button>
  &lt;ee-button disabled class="no-bg no-border"> Disabled &lt;/ee-button>
  </pre>
</div>

<h3>no-shadow</h3>
Button with "no-shadow" class wont' have raised effect.
<div class="example">
  <ee-button class="no-bg no-border no-shadow"> Default </ee-button>
  <ee-button class="primary no-bg no-border no-shadow"> Primary </ee-button>
  <ee-button class="accent no-bg no-border no-shadow"> Accent </ee-button>
  <ee-button disabled class="no-bg no-border no-shadow"> Disabled </ee-button>
  <pre language="html" ee-prism>
  &lt;ee-button class="no-bg no-border <b>no-shadow</b>"> Default &lt;/ee-button>
  &lt;ee-button class="primary no-bg no-border <b>no-shadow</b>"> Primary &lt;/ee-button>
  &lt;ee-button class="accent no-bg no-border <b>no-shadow</b>"> Accent &lt;/ee-button>
  &lt;ee-button disabled class="no-bg no-border <b>no-shadow</b>"> Disabled &lt;/ee-button>
  </pre>
</div>

<h3>Icon</h3>
Button with "icon" class will have rounded shape instead of rectanble shape.
<div class="example">
  <ee-button class="icon">&#9829;</ee-button>
  <ee-button class="icon primary">&#9829;</ee-button>
  <ee-button class="icon accent">&#9829;</ee-button>
  <ee-button class="icon" disabled>&#9829;</ee-button> Default
  <br/>
  <ee-button class="icon no-bg ">&#9829;</ee-button>
  <ee-button class="icon primary no-bg">&#9829;</ee-button>
  <ee-button class="icon accent no-bg">&#9829;</ee-button>
  <ee-button class="icon no-bg" disabled>&#9829;</ee-button> no-bg
  <br/>
  <ee-button class="icon no-bg no-border no-shadow">&#9829;</ee-button>
  <ee-button class="icon primary no-bg no-border no-shadow">&#9829;</ee-button>
  <ee-button class="icon accent no-bg no-border no-shadow">&#9829;</ee-button>
  <ee-button class="icon no-bg no-border no-shadow" disabled>&#9829;</ee-button> no-border
  <pre language="html" ee-prism>
  &lt;ee-button class="<b>icon</b>">&#9829;&lt;/ee-button>
  &lt;ee-button class="<b>icon</b> primary">&#9829;&lt;/ee-button>
  &lt;ee-button class="<b>icon</b> accent">&#9829;&lt;/ee-button>
  &lt;ee-button class="<b>icon</b>" disabled>&#9829;&lt;/ee-button>
  </pre>
</div>
`,
 styles: [`
  .custom ee-button {
    --primary: green;
    --accent: orange;L:
    --disabled: grey;
    --size: 32px;
  }
  .loading-section ee-button {
    min-width: 120px;
  }
  
  @keyframes loading {
    to { transform: rotate(360deg); }
  }
   `]
})
export class ButtonComponent {}

@NgModule({
  declarations: [ButtonComponent, CustomCssComponent],
  imports: [ ButtonModule, FormsModule, CommonModule, PrismModule, AceModule ]
}) class DynModule {}
