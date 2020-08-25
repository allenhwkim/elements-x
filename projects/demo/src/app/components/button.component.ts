import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '../../../../lib/src';

@Component({
  template: `
<h3 ripple>Features</h3>
<li> When clicked, button become automatically disabled for a second to prevent double click </li>
<li> Able to show loading sign with 'loadingBy' property </li>
<li> Customizable color and button size(height) </li>
<li> css is overridable. To override style, re-define variable values and css properties.
  <pre>
    .custom ax-button {{'{'}}
      --primary: green;
      --accent: orange;
      --disabled: grey;
      --size: 32px;
    }
  </pre>
</li>

<h3>Default</h3>
<p>
  <ax-button ripple class="ripple"> Default 
  <!--
  <span class="ripple" style="position: absolute; background-color: rgba(0, 0, 0, 0.16); border-radius: 100%; height: 86.1562px; width: 86.1562px; pointer-events: none; left: 10.9219px; top: 265.047px; transform: scale(1.06029); opacity: 0.469853;"></span>
  -->
  </ax-button>
  <ax-button class="ripple primary"> Primary </ax-button>
  <ax-button class="ripple accent"> Accent </ax-button>
  <ax-button disabled> Disabled </ax-button>
</p>
<pre>
  &lt;ax-button> Default &lt;/ax-button>
  &lt;ax-button class="<b>primary</b>"> Primary &lt;/ax-button>
  &lt;ax-button class="<b>accent</b>"> Accent &lt;/ax-button>
  &lt;ax-button <b>disabled</b>> Disabled &lt;/ax-button>
</pre>

<h3>Loading</h3>
<p>
  Any element with "loading" class is hidden in default.
  When the condition given with property "loadingBy" is true, it shows the element with "loading" class.
  While it is loading, users won't be able to click the button.
</p>

Click the below buttons to see loading sign.
<p class="loading-section">
  <ax-button (click)="onSubmit(1)" [loadingBy]="!apiResp1">
    <i class="loading"></i> 
    Default
  </ax-button>
  <ax-button class="primary" (click)="onSubmit(2)" [loadingBy]="!apiResp2"> 
    Primary
    <i class="loading"></i>
  </ax-button>
  <ax-button class="accent" (click)="onSubmit(3)" [loadingBy]="!apiResp3">
    <i class="loading"></i>
    Accent
  </ax-button>
<pre>
  &lt;ax-button (click)="onSubmit(1)" 
    [<b>loadingBy</b>]="<b>!apiResp1</b>">
    &lt;i class="<b>loading</b>">&lt;/i> 
    Default
  &lt;/ax-button>
  &lt;ax-button class="primary" (click)="onSubmit(2)" 
    [<b>loadingBy</b>]="<b>!apiResp2</b>"> 
    Primary
    &lt;i class="<b>loading</b>">&lt;/i>
  &lt;/ax-button>
  &lt;ax-button class="accent" (click)="onSubmit(3)" 
    [<b>loadingBy</b>]="<b>!apiResp3</b>">
    &lt;i class="<b>loading</b>">&lt;/i>
    Accent
  &lt;/ax-button>
</pre>


<h3>no-bg</h3>
Button with "no-class" attribute won't have background color, switching to text color.

<p class="custom">
  <ax-button class="no-bg"> Default </ax-button>
  <ax-button class="primary no-bg"> Primary </ax-button>
  <ax-button class="accent no-bg"> Accent </ax-button>
  <ax-button disabled class="no-bg"> Disabled </ax-button>
</p>
<pre>
  &lt;ax-button class="<b>no-bg</b>"> Default &lt;/ax-button>
  &lt;ax-button class="primary <b>no-bg</b>"> Primary &lt;/ax-button>
  &lt;ax-button class="accent <b>no-bg</b>"> Accent &lt;/ax-button>
  &lt;ax-button disabled class="<b>no-bg</b>"> Disabled &lt;/ax-button>
</pre>

<h3>no-border</h3>
<p>
  <ax-button class="no-bg no-border"> Default </ax-button>
  <ax-button class="primary no-bg no-border"> Primary </ax-button>
  <ax-button class="accent no-bg no-border"> Accent </ax-button>
  <ax-button disabled class="no-bg no-border"> Disabled </ax-button>
</p>
<pre>
  &lt;ax-button class="no-bg no-border"> Default &lt;/ax-button>
  &lt;ax-button class="primary no-bg no-border"> Primary &lt;/ax-button>
  &lt;ax-button class="accent no-bg no-border"> Accent &lt;/ax-button>
  &lt;ax-button disabled class="no-bg no-border"> Disabled &lt;/ax-button>
</pre>

<h3>no-shadow</h3>
Button with "no-shadow" class wont' have raised effect.
<p>
  <ax-button class="no-bg no-border no-shadow"> Default </ax-button>
  <ax-button class="primary no-bg no-border no-shadow"> Primary </ax-button>
  <ax-button class="accent no-bg no-border no-shadow"> Accent </ax-button>
  <ax-button disabled class="no-bg no-border no-shadow"> Disabled </ax-button>
</p>
<pre>
  &lt;ax-button class="no-bg no-border <b>no-shadow</b>"> Default &lt;/ax-button>
  &lt;ax-button class="primary no-bg no-border <b>no-shadow</b>"> Primary &lt;/ax-button>
  &lt;ax-button class="accent no-bg no-border <b>no-shadow</b>"> Accent &lt;/ax-button>
  &lt;ax-button disabled class="no-bg no-border <b>no-shadow</b>"> Disabled &lt;/ax-button>
</pre>

<h3>Icon</h3>
Button with "icon" class will have rounded shape instead of rectanble shape.
<p>
  <ax-button class="icon">&#9829;</ax-button>
  <ax-button class="icon primary">&#9829;</ax-button>
  <ax-button class="icon accent">&#9829;</ax-button>
  <ax-button class="icon" disabled>&#9829;</ax-button> Default
  <br/>
  <ax-button class="icon no-bg ">&#9829;</ax-button>
  <ax-button class="icon primary no-bg">&#9829;</ax-button>
  <ax-button class="icon accent no-bg">&#9829;</ax-button>
  <ax-button class="icon no-bg" disabled>&#9829;</ax-button> no-bg
  <br/>
  <ax-button class="icon no-bg no-border no-shadow">&#9829;</ax-button>
  <ax-button class="icon primary no-bg no-border no-shadow">&#9829;</ax-button>
  <ax-button class="icon accent no-bg no-border no-shadow">&#9829;</ax-button>
  <ax-button class="icon no-bg no-border no-shadow" disabled>&#9829;</ax-button> no-border
</p>
<pre>
  &lt;ax-button class="<b>icon</b>">&#9829;&lt;/ax-button>
  &lt;ax-button class="<b>icon</b> primary">&#9829;&lt;/ax-button>
  &lt;ax-button class="<b>icon</b> accent">&#9829;&lt;/ax-button>
  &lt;ax-button class="<b>icon</b>" disabled>&#9829;&lt;/ax-button>
</pre>
`,
 styles: [`
  .custom ax-button {
    --primary: green;
    --accent: orange;L:
    --disabled: grey;
    --size: 32px;
  }
  .loading-section ax-button {
    min-width: 120px;
  }
  
  @keyframes loading {
    to { transform: rotate(360deg); }
  }
  .loading {
    display: inline-block;
    width: .75em;
    height: .75em;
    vertical-align: middle;
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
  imports: [ ButtonModule, FormsModule, CommonModule ]
}) class DynModule {}
