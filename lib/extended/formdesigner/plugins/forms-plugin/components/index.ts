import form from './form';
import input from '../../elements-x-plugin/components/input-text';
import label from './label';
import checkbox from './checkbox';
import radio from './radio';
import textarea from './textarea';
import button from './button';
import select from './select';
import option from './option';

export default function(editor) {
  form(editor);
  input(editor);
  label(editor);
  checkbox(editor);
  radio(editor);
  textarea(editor);
  button(editor);
  option(editor);
  select(editor); // option first
}