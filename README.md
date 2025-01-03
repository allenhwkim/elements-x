# elements-x

<img src="https://user-images.githubusercontent.com/1437734/100136034-78959200-2e58-11eb-8125-260b78054a10.png" width="600" />

## npm usage 
[Example](https://stackblitz.com/edit/elements-x)
1. Install elements-x, `$ npm install elements-X -D`
2. Import into your code to define all custom elements, `import 'elements-x`
3. Use it like html tags, e.g. `<x-clock run></x-clock>`

## browser usage
[Example](https://unpkg.com/elements-x/dist/lib/test.html)
```
<head>
  <script type="module" src="https://unpkg.com/elements-x"></script> 
</head>
<body>
  <x-calendar></x-calendar>
</body>
```

## Import
```
/* To import all elements and define custom elements */
import 'elements-x';

/* To import and define all core elements */
import 'elements-x/dist/lib/core.umd.js'; 

/* To import and define all extended elements */
import 'elements-x/dist/lib/extended.umd.js'; 

/* To import and define only one element */
window.X = {override: true};
import { Calendar } from 'elements-x';
// import { Calendar } from './my-own-calendar';
customElements.define('x-calendar', Calendar);
```

## Core elements
 * Calendar
 * ComboBox (Input with dropdown)
 * Dropdown (Display as dropdown underneath of input or button)
 * File
 * List (Show hierarchy and select from it)
 * Map (Openlayer map)
 * Masked (Input with mask)
 * Pagination 
 * Resize
 * Table (array of inputs, or table-structured inputs)

## Extended elements
 * BarCode
 * Clock
 * Highlight (Code syntax prettifier)
 * Json (Collapsible JSON viewer) 
 * Monaco (Code editor)
 * QRCode
 * Sidebar
 * Stepper(form stepper)
 * Formflow (Form flow diagram with Reactflow)
 * Formdesigner (A page designer with GrapesJs)

## Deployment
  * When `main` branch is updated, it is built and deployed by [Netlify](https://app.netlify.com/sites/vigilant-lalande-2441c3/configuration/deploys#continuous-deployment) automatically.
  * When deployed, it's published to https://elements-x.com