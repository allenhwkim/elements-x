import { buttonType } from './types/button';
import { inputCheckboxType } from './types/input-checkbox';
import { inputRadioType } from './types/input-radio';
import { inputType } from './types/input';
import { labelType } from './types/label';
import { optionType } from './types/option';
import { selectType } from './types/select';
import { textareaType } from './types/textarea';
import { formType } from './types/form';

import { calendarType } from './types/custom-elements/calendar';
import { dataTableType } from './types/custom-elements/data-table';
import { mapType } from './types/custom-elements/map';
import { maskedType } from './types/custom-elements/masked';

export const componentTypes = (editor) => {
  editor.DomComponents.addType('button', buttonType);
  editor.DomComponents.addType('input-checkbox', inputCheckboxType);
  editor.DomComponents.addType('input-radio', inputRadioType);
  editor.DomComponents.addType('input', inputType);
  editor.DomComponents.addType('label', labelType);
  editor.DomComponents.addType('option', optionType);
  editor.DomComponents.addType('select', selectType);
  editor.DomComponents.addType('textarea', textareaType);
  editor.DomComponents.addType('form', formType);

  editor.DomComponents.addType('calendar', calendarType);
  editor.DomComponents.addType('data-table', dataTableType);
  editor.DomComponents.addType('map', mapType);
  editor.DomComponents.addType('masked', maskedType);
};

