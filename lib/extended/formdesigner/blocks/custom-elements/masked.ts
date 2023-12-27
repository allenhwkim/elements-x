export default {
  id: 'x-masked',
  category: 'Custom Elements',
  label: 'Masked', 
  content: `
    <label>
      Phone number:
      <x-masked data-gjs-type="masked" mask="9 (999) 999-9999">
        <input value="1"  autocomplete="off"/>
      </x-maxked>
    </label>
  `,
};