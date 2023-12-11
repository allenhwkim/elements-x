`<x-stepper current-step="form1" data="forms"></x-stepper>`

Must display stepNames by the forms data

A step shows its status
* x-error: formdata found and getErrors() returns errors.
* x-complete: formdata found and getErrors() returns null.
* x-active: currentForm is being filled in.
* x-incomplete: formdata not found and currentForm has less index.
* x-skipped: formdata not found and currenForm has bigger index.

Inputs : 
 - forms
 - submitFunc
 - stepNames

https://codesandbox.io/s/stepper-html-css-g5tqs8?file=/src/style2.scss
