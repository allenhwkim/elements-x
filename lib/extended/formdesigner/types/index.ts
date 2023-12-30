import { buttonType } from './form-controls/button';

// form control types
import { textareaType } from './form-controls/textarea';
import { formType } from './form-controls/form';
import { labelType } from './form-controls/label';

// <input> types
import { inputType } from './form-controls/input';
import { loadCheckboxType } from './form-controls/input-checkbox';
import { loadRadioType } from './form-controls/input-radio';
import { loadRangeType } from './form-controls/input-range';

// <select> types
import { loadSelectType } from './form-controls/select';
import { selectOptionsTrait } from './form-controls/select-options';
import { optionType } from './form-controls/option';

// custom element types
import { calendarType } from './custom-elements/calendar';
import { dataTableType } from './custom-elements/data-table';
import { mapType } from './custom-elements/map';
import { maskedType } from './custom-elements/masked';
import { loadComboboxType } from './custom-elements/combobox';
import { comboboxOptionsTrait } from './custom-elements/combobox-options';
import { loadDropdownType } from './custom-elements/dropdown';
import { Editor } from 'grapesjs';

import { imageType } from './image';

export const componentTypes = (editor: Editor) => {
  editor.DomComponents.addType('image', imageType);

  editor.DomComponents.addType('calendar', calendarType);
  editor.DomComponents.addType('datatable', dataTableType);
  editor.DomComponents.addType('map', mapType);
  editor.DomComponents.addType('masked', maskedType);
  editor.DomComponents.addType('combobox', loadComboboxType(editor));
  editor.TraitManager.addType('combobox-options', comboboxOptionsTrait);
  editor.DomComponents.addType('dropdown', loadDropdownType(editor));

  editor.DomComponents.addType('button', buttonType);
  editor.DomComponents.addType('label', labelType);
  editor.DomComponents.addType('textarea', textareaType);
  editor.DomComponents.addType('form', formType);

  editor.DomComponents.addType('input', inputType);
  editor.DomComponents.addType('checkbox', loadCheckboxType(editor));
  editor.DomComponents.addType('radio', loadRadioType(editor));
  editor.DomComponents.addType('range', loadRangeType(editor));

  editor.DomComponents.addType('select', loadSelectType(editor));
  editor.TraitManager.addType('select-options', selectOptionsTrait);
  editor.DomComponents.addType('option', optionType);
};

