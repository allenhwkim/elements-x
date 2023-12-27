import { BlockProperties } from "grapesjs";

export default {
  id: 'x-dropdown',
  category: 'Custom Elements',
  label: 'Dropdown', 
  content: `
    <button>Show dropdown</button>
    <x-dropdown data-gjs-type="dropdown" class="p-4">
      Dropdown contents.
    </x-dropdown>
  `,
} as BlockProperties;