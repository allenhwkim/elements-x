export default {
  id: 'bs5-form', // id is mandatory
  category: 'Bootstrap5 Forms',
  label: 'Form', // You can use HTML/SVG inside labels
  // attributes: { class:'gjs-block-section' },
  content: `
<form class="p-3" novalidate>
  <fieldset>
    <legend>Contact information</legend>

    <div class="row">
      <div class="col-md-4 col-sm-6 mb-3">
        <div class="form-floating">
          <input required class="form-control" id="first-name" placeholder="Enter First Name" />
          <label for="first-name">First Name</label>
          <div class="invalid-feedback"> Please enter first name. </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6 mb-3">
        <div class="form-floating">
          <input required class="form-control" id="last-name" placeholder="Enter Last Name" />
          <label for="last-name">Last Name</label>
          <div class="invalid-feedback"> Please enter last name. </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6 mb-3">
        <div class="form-floating">
          <input required class="form-control" id="email" placeholder="Enter Email Address" />
          <label for="email" type="email">Email Address</label>
          <div class="invalid-feedback"> Email is required. </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6 mb-3">
        <div class="form-floating">
          <input required class="form-control" id="phonenumber" placeholder="phone number" type="tel">
          <label for="phonenumber">Phone number</label>
          <small id="passwordHelpBlock" class="form-text text-muted">
            000-000-0000
          </small>
          <div class="invalid-feedback"> Phone number is required. </div>
        </div>
      </div>
    </div>
  </fieldset>
  
  <fieldset>
    <legend>Mailing address</legend>

    <div class="row">
      <div class="col-sm-6 mb-3">
        <label for="address">Address</label>
        <input required id="address" class="form-control">
        <div class="invalid-feedback">Please enter address. </div>
      </div>

      <div class="col-sm-6 mb-3">
        <label for="address2">Address 2 (optional)</label>
        <input id="address2" aria-describedby="address2HelpBlock" class="form-control">
        <small id="address2HelpBlock" class="form-text text-muted">
          Enter additional address information such as unit, apartment,
          suite # or building name.
        </small>
      </div>

    </div>

    <div class="row">
      <div class="col-md-4 col-sm-6 mb-3">
        <label for="city">City</label>
        <input required class="form-control" id="city" placeholder="Enter City" />
        <div class="invalid-feedback">Please enter city name. </div>
      </div>

      <div class="col-md-4 col-sm-6 mb-3">
        <label for="province">Province or territory</label>
        <select required class="form-select" id="province">
          <option value="">Select province or territory</option>
          <option value="1">Alberta</option>
          <option value="2">British Columbia</option>
          <option value="3">Manitoba</option>
          <option value="4">New Brunswick</option>
          <option value="5">Newfoundland and Labrador</option>
          <option value="6">Northwest Territories</option>
          <option value="7">Nova Scotia</option>
          <option value="8">Nunavut</option>
          <option value="9">Ontario</option>
          <option value="10">Prince Edward Island</option>
          <option value="11">Quebec</option>
          <option value="12">Saskatchewan</option>
          <option value="13">Yukon</option>
        </select>
        <div class="invalid-feedback">Please select a province. </div>
      </div>

      <div class="col-md-4 col-sm-6 mb-3">
        <label for="postal-code">Postal Code</label>
        <input required class="form-control" id="postal-code" placeholder="Enter Postal Code" />
        <div class="invalid-feedback">Please enter postal code. </div>
      </div>
      </div>
    </div>
  </fieldset>

  <fieldset>
    <legend>Attach your application</legend>
    <p>Upload your completed application. Make sure all pages are included and all applicable fields are filled.</p>
    <div class="mb-3">
      <label for="exampleFormControlFile1">Attach your application</label>
      <input type="file" class="form-control" id="exampleFormControlFile1">
      <small class="form-text text-muted">
        Files must be no larger than 10MB. Accepted file types are .pdf or .docx.
      </small>
    </div>
  </fieldset>

  <fieldset class="mb-3">
    <legend>Select an option</legend>
    <input required id="option1" class="me-1 form-check-input" type="radio" value="1" name="my-radio">
    <label for="option1" class="form-check-inline"> Option 1 </label>

    <input required id="option2" class="me-1 form-check-input" type="radio" value="2" name="my-radio">
    <label for="option2" class="form-check-inline"> Option 2 </label>
    <div class="invalid-feedback">Please select an option. </div>
  </fieldset>

  <fieldset class="mb-3">
    <label class="form-check">
      <input required id="agree" class="form-check-input" type="checkbox" />
      <label for="agree" class="form-check-label">I agree to terms and conditions.</label>
      <div class="invalid-feedback">You must agree to terms and conditions to proceed </div>
    </label>
    <label class="form-check form-switch">
      <input required id="agree2" class="form-check-input" type="checkbox" name="my-switch">
      <label for="agree2" class="form-check-label">I agree to terms and conditions.</label>
      <div class="invalid-feedback">You must agree to terms and conditions to proceed </div>
    </label>
  </fieldset>

  <fieldset class="mb-3"> 
    <label for="comments">Leave comments</label>
    <textarea rows="6" id="comments" 
      class="form-control" placeholder="Max 2000 chractersa"></textarea>
  </fieldset>

  <button class="btn btn-primary" type="submit">Apply now</button>
</form>
  `,
};

