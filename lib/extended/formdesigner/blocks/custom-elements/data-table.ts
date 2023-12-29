import { BlockProperties } from "grapesjs";

export default {
  id: 'x-table',
  category: 'Custom Elements',
  label: 'Data Table', 
  content: `
    <label class="d-block">
      <span>Subject:</span>
      <x-table data-gjs-type="datatable" 
        input-class="form-control d-inline-block w-auto" 
        required="" value='[{"key":"", "value":""}]'>
      </x-table>
    </label>
  `,
};