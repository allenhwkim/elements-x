export default {
  id: 'x-masked',
  category: 'Custom Elements',
  label: 'Masked', 
  content: `
    <label class="d-block">
      <span>Phone number:</span>
      <x-masked data-gjs-type="masked" class="d-block" mask="9 (999) 999-9999" >
        <input value="1" autocomplete="off" class="form-control"/>
      </x-maxked>
    </label>
  `,
};