import { Editor } from "grapesjs";

export default function(editor: Editor, options={category: 'Forms'}) {
  editor.Components.addType('form', {
    isComponent: el => el.tagName == 'FORM',

    model: {
      defaults: {
        tagName: 'form',
        droppable: ':not(form)',
        draggable: ':not(form)',
        attributes: { method: 'get' },
        traits: [{
          type: 'select',
          name: 'method',
          options: [
            {value: 'get', name: 'GET'},
            {value: 'post', name: 'POST'},
          ],
        }, {
          name: 'action',
        }],
      },
    },

    view: {
      events: {
        // The submit of the form might redirect the user from the editor so
        // we should always prevent the default here.
        submit: (e: Event) => e.preventDefault(),
      } as any
    },
  });

  editor.BlockManager.add('form', {
    ...options, // e.g. {category: {id: 'form', label: 'forms'}}
    label: 'Form',
    media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 5.5c0-.3-.5-.5-1.3-.5H3.4c-.8 0-1.3.2-1.3.5v3c0 .3.5.5 1.3.5h17.4c.8 0 1.3-.2 1.3-.5v-3zM21 8H3V6h18v2zM22 10.5c0-.3-.5-.5-1.3-.5H3.4c-.8 0-1.3.2-1.3.5v3c0 .3.5.5 1.3.5h17.4c.8 0 1.3-.2 1.3-.5v-3zM21 13H3v-2h18v2z"/><rect width="10" height="3" x="2" y="15" rx=".5"/></svg>',
    content: `
<x-stepper class="d-block container" steps="Step1, Step2, Step3"></x-stepper>

<form class="container">

  <div class="row">
    <div class="col-md-6" mb-6>
      <label for="first-name">First name</label>
      <input class="form-control" id="first-name" placeholder="First name" value="Mark" required>
    </div>
    <div class="col-md-6" mb-6>
      <label for="last-name">Last name</label>
      <input class="form-control" id="last-name" placeholder="Last name" required>
    </div>
  </div>

  <div class="row">
    <div class="col-md-6 mb-3">
      <label for="city">City</label>
      <input class="form-control" id="city" placeholder="City" required>
    </div>
    <div class="col-md-3 mb-3">
      <label for="state">State</label>
      <input class="form-control" id="state" placeholder="State" required>
    </div>
    <div class="col-md-3 mb-3">
      <label for="zip">Zip</label>
      <input class="form-control" id="zip" placeholder="Zip" required>
    </div>
  </div>

  <div class="form-group">
    <div class="form-check-inline">Do you want to receive news letters?</div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="newsleter" id="newsletter-yes" value="yes">
      <label class="form-check-label" for="newsletter-yes">Yes</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="newsletter" id="newsletter-no" value="no">
      <label class="form-check-label" for="newsletter-no">No</label>
    </div>
  </div>

  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required>
      <label class="form-check-label" for="invalidCheck2">
        Agree to terms and conditions
      </label>
    </div>
  </div>

  <div class="buttons">
    <button class="btn btn-light back me-2">Back</button>
    <button class="btn btn-primary" type="submit">Next</button>
  </div>
</form>
    ` 
  });
}