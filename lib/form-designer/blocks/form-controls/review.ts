export default {
  id: 'bs5-control-review',
  category: 'Bootstrap5 Form Controls',
  label: 'Review',
  content: `
    <div class="container pb-3">
      <div class="row pb-2">
        <div class="col-sm-3">First name</div>
        <div class="col-sm-9">{{firstName}} </div>
      </div>
      <div class="row pb-2">
        <div class="col-sm-3">Last name</div>
        <div class="col-sm-9">{{lastName}} </div>
      </div>
      <div class="row pb-2">
        <div class="col-sm-3">Address</div>
        <div class="col-sm-9">{{addressStreet}} {{addressCity}} {{addressProvince}} {{addressPostalCode}}</div>
      </div>
      <div class="row pb-2">
        <div class="col-sm-3">Phone</div>
        <div class="col-sm-9">{{phoneType}} {{phoneNumber}} {{phoneExt}}</div>
      </div>
    </div>
  `
};