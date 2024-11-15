import type { Editor, Plugin, PluginOptions } from 'grapesjs';
import form from '../components/form';
import input from '../components/input';
import label from '../components/label';
import checkbox from '../components/checkbox';
import radio from '../components/radio';
import textarea from '../components/textarea';
import button from '../components/button';
import select from '../components/select';
import option from '../components/option';

export default function formsPlugin(editor: Editor) {
  // load components by add types and block
  form(editor);
  input(editor);
  label(editor);
  checkbox(editor);
  radio(editor);
  textarea(editor);
  button(editor);
  option(editor);
  select(editor); // option first
};
