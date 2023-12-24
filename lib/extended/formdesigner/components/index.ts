import { buttonType } from './types/button';

// form control types
import { textareaType } from './types/textarea';
import { formType } from './types/form';
import { labelType } from './types/label';

// <input> types
import { inputType } from './types/input';
import { loadCheckboxType } from './types/input-checkbox';
import { loadRadioType } from './types/input-radio';
import { loadRangeType } from './types/input-range';

// <select> types
import { loadSelectType } from './types/select';
import { selectOptionsTrait } from './types/select-options';
import { optionType } from './types/option';

// custom element types
import { calendarType } from './types/custom-elements/calendar';
import { dataTableType } from './types/custom-elements/data-table';
import { mapType } from './types/custom-elements/map';
import { maskedType } from './types/custom-elements/masked';

selectOptionsTrait

export const componentTypes = (editor) => {
  editor.DomComponents.addType('calendar', calendarType);
  editor.DomComponents.addType('data-table', dataTableType);
  editor.DomComponents.addType('map', mapType);
  editor.DomComponents.addType('masked', maskedType);

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

