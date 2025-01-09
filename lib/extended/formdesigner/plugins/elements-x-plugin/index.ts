import type { Editor, PluginOptions } from 'grapesjs';
import components from './components';
import blocks from './blocks';
import commands from './commands';

export default function(editor: Editor, options: PluginOptions) {
  commands(editor);
  components(editor);
  blocks(editor);

  editor.setStyle( options.css || `
    x-calendar .week-days-container { max-width: 400px; }
    x-calendar .days-container { max-width: 400px; }
  `);
};