export default {
  id: 'bs5-control-address',
  category: 'Bootstrap5 Form Controls',
  label: 'Address',
  content: `
    <div class="container pb-3">
      <div class="row">
        <div class="col-6">
          <label class="d-block">
            <div class="fw-bold">Street address</div>
            <input name="addressStreet" class="form-control">
          </label>
        </div>
        <div class="col">
          <label class="d-block">
            <div class="fw-bold">City</div>
            <input name="addressCity" class="form-control">
          </label>
        </div>
        <div class="col">
          <label class="d-block">
            <div class="fw-bold">Province</div>
            <combo-box>
              <input name="addressProvince" placeholder="Choose one" autoComplete="off" value="ON" class="form-control" />
                <ul>
                  <li value="AB">Alberta</li>
                  <li value="BC">British Columbia</li>
                  <li value="MB">Manitoba</li>
                  <li value="NB">New Brunswick</li>
                  <li value="NL">Newfoundland and Labrador</li>
                  <li value="NS">Nova Scotia</li>
                  <li value="ON">Ontario</li>
                  <li value="PE">Prince Edward Island</li>
                  <li value="QC">Quebec</li>
                  <li value="SK">Saskatchewan</li>
                  <li value="NT">Northwest Territories</li>
                  <li value="NU">Nunavut</li>
                  <li value="YT">Yukon</li>
                </li> 
              </ul>
            </combo-box>
          </label>
        </div>
        <div class="col">
          <label class="d-block">
            <div class="fw-bold">Postal code</div>
            <input-mask mask="A9A 9A9" >
              <input  name="addressPostal" class="form-control"/>
            </input-mask>
          </label>
        </div>
      </div>
    </div>
  `
};