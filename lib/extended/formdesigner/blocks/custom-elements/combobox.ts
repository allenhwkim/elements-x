export default {
  id: 'x-combobox',
  category: 'Custom Elements',
  label: 'Combobox', 
  content: `
  <x-combobox>
    <input placeholder="Choose one value" autocomplete="off" value="Hello World">
    <ul>
      <li value="">Choose One</li>
      <li value="1">Hello</li>
      <li>Hello World</li>
      <li>Foo</li>
      <li class="disabled">Disabled</li>
      <li>Foo Bar</li>
    </ul>
  </x-combobox>`,
};