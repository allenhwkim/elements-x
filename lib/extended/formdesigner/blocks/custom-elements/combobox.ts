import { BlockProperties } from "grapesjs";

export default {
  id: 'x-combobox',
  category: 'Custom Elements',
  label: 'Combobox', 
  content: {
    type: 'combobox',
    tagName: 'x-combobox',
    attributes: {},
    components: [
      `<input placeholder="Choose one value" autocomplete="off" value="Hello World">`,
      `<ul>
        <li value="">Choose One</li>
        <li value="1">Hello</li>
        <li>Hello World</li>
        <li>Foo</li>
        <li class="disabled">Disabled</li>
        <li>Foo Bar</li>
      </ul>`
    ]
  }, 
} as BlockProperties;