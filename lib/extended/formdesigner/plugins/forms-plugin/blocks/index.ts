import form from './form';
import checkbox from './checkbox';
import radio from './radio';
import textarea from './textarea';
import button from './button';
import select from './select';
import { BlockProperties } from 'grapesjs';

export default function(editor, props: BlockProperties) {
  form(editor, props);
  checkbox(editor, props);
  radio(editor, props);
  textarea(editor, props);
  button(editor, props);
  select(editor, props); 
}