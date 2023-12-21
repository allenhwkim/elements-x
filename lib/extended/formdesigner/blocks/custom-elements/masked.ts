export default {
  id: 'x-masked',
  category: 'Custom Elements',
  label: 'Masked', 
  content: `
    <label>
      Phone number:
      <x-masked mask="9 (999) 999-9999">
        <input value="1" />
      </x-maxked>
    </label>
  `,
};