import { BlockProperties } from "grapesjs";

export default {
  id: 'x-combobox',
  category: 'Custom Elements',
  label: 'Combobox', 
  content: `
    <label class="d-block">
      <span>Subject:</span>
      <x-combobox data-gjs-type="combobox" class="form-control p-0 border-0">
        <input class="form-control" placeholder="Choose one value" autocomplete="off" value="Hello World">
        <ul>
          <li value="">Choose One</li>
          <li value="1">Hello</li>
          <li>Hello World</li>
          <li>Foo</li>
          <li>Foo Bar</li>
        </ul>
      </x-combobox>
    </label>
    `
} as BlockProperties;