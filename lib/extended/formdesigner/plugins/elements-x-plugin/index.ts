import type { Editor, Plugin, PluginOptions } from 'grapesjs';
import components from './components';
import blocks from './blocks';
import commands from './commands';

const elementsXPlugin: Plugin<PluginOptions> = (editor) => {
  commands(editor);
  components(editor);
  blocks(editor);
};

export default elementsXPlugin;