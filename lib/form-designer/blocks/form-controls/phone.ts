export default {
  id: 'bs5-control-phone',
  category: 'Bootstrap5 Form Controls',
  label: 'Phone number',
  content: `
    <div class="container pb-3">
      <div class="row">
        <div class="col">
          <label class="d-block">
            <div class="fw-bold">Phone type</div>
            <combo-box class="d-block">
              <input name="phoneType" placeholder="Choose one" autoComplete="off" value="Mobile" class="form-control" />
                <ul>
                  <li value="Mobile">Mobile phone</li>
                  <li value="Home">Home phone</li>
                  <li value="Business">Business phone</li>
                </li> 
              </ul>
            </combo-box>
          </label>
        </div>
        <div class="col">
          <label class="d-block">
            <div class="fw-bold">Phone number</div>
            <input-mask mask="(999) 999-9999" >
              <input name="phoneNumber" class="form-control"/>
            </input-mask>
          </label>
        </div>
        <div class="col">
          <label class="d-block">
            <div class="fw-bold">Extension</div>
            <input name="phoneExt" class="form-control"/>
          </label>
        </div>
      </div>
    </div>
  `
};