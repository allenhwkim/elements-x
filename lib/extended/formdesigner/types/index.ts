
import { calendarType } from './custom-elements/calendar';
import { dataTableType } from './custom-elements/data-table';
import { mapType } from './custom-elements/map';
import { maskedType } from './custom-elements/masked';
import { loadComboboxType } from './custom-elements/combobox';
import { comboboxOptionsTrait } from './custom-elements/combobox-options';
import { loadDropdownType } from './custom-elements/dropdown';
import { Editor } from 'grapesjs';

export const componentTypes = (editor: Editor) => {
  editor.DomComponents.addType('calendar', calendarType);
  editor.DomComponents.addType('datatable', dataTableType);
  editor.DomComponents.addType('map', mapType);
  editor.DomComponents.addType('masked', maskedType);
  editor.DomComponents.addType('combobox', loadComboboxType(editor));
  editor.TraitManager.addType('combobox-options', comboboxOptionsTrait);
  editor.DomComponents.addType('dropdown', loadDropdownType(editor));
};

