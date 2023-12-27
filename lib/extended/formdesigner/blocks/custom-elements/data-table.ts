import { BlockProperties } from "grapesjs";

export default {
  id: 'x-table',
  category: 'Custom Elements',
  label: 'Data Table', 
  content: `
    <x-table data-gjs-type="datatable" required="" value='[{"key":"", "value":""}]'></x-table>
  `,
};