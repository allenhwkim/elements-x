import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule, PrismModule } from '../../../../lib/src';

@Component({
  template: `
<h3>Features</h3>
<li> When clicked, button become automatically disabled for a second to prevent double click </li>
<li> Able to show loading sign with 'loadingBy' property </li>
<li> Customizable color and button size(height) </li>
<li> css is overridable. To override style, re-define variable values and css properties.
  <pre ee-prism language="css">
  .custom ee-button {{'{'}}
    --primary: green;
    --accent: orange;
    --disabled: grey;
    --size: 32px;
  }
  </pre>
</li>

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
  <pre ee-prism>
    &lt;ee-button> Default &lt;/ee-button>
    &lt;ee-button class="<b>primary</b>"> Primary &lt;/ee-button>
    &lt;ee-button class="<b>accent</b>"> Accent &lt;/ee-button>
    &lt;ee-button <b>disabled</b>> Disabled &lt;/ee-button>
  </pre>
</div>

<h3>Loading</h3>
<p>
  Any element with "loading" class is hidden in default.
  When the condition given with property "loadingBy" is true, it shows the element with "loading" class.
  While it is loading, users won't be able to click the button.
</p>

Click the below buttons to see loading sign.
<div class="example loading-section">
  <ee-button (click)="onSubmit(1)" [loadingBy]="!apiResp1">
    <i class="loading"></i> 
    Default
  </ee-button>
  <ee-button class="primary" (click)="onSubmit(2)" [loadingBy]="!apiResp2"> 
    Primary
    <i class="loading"></i>
  </ee-button>
  <ee-button class="accent" (click)="onSubmit(3)" [loadingBy]="!apiResp3">
    <i class="loading"></i>
    Accent
  </ee-button>
  <pre ee-prism>
  &lt;ee-button (click)="onSubmit(1)" 
    [<b>loadingBy</b>]="<b>!apiResp1</b>">
    &lt;i class="<b>loading</b>">&lt;/i> 
    Default
  &lt;/ee-button>
  &lt;ee-button class="primary" (click)="onSubmit(2)" 
    [<b>loadingBy</b>]="<b>!apiResp2</b>"> 
    Primary
    &lt;i class="<b>loading</b>">&lt;/i>
  &lt;/ee-button>
  &lt;ee-button class="accent" (click)="onSubmit(3)" 
    [<b>loadingBy</b>]="<b>!apiResp3</b>">
    &lt;i class="<b>loading</b>">&lt;/i>
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
  <pre ee-prism>
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
  <pre ee-prism>
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
  <pre ee-prism>
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
  <pre ee-prism>
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
  .loading {
    display: inline-block;
    width: 1em;
    height: 1em;
    position: relative;
    top: 2px;
    border: .2em solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: loading .75s linear infinite;
  }
   `]
})
export class ButtonComponent {
  apiResp1;
  apiResp2;
  apiResp3;
  apiResp4;
  onSubmit(num) {
    this[`apiResp${num}`] = undefined;
    setTimeout(_ => {
      this[`apiResp${num}`] = [{},{}];
    }, 2000);
  }
}

@NgModule({
  declarations: [ButtonComponent],
  imports: [ ButtonModule, FormsModule, CommonModule, PrismModule ]
}) class DynModule {}
