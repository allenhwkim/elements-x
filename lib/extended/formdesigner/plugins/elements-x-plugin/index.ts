import type { Editor, Plugin, PluginOptions } from 'grapesjs';
import components from './components';
import blocks from './blocks';

const elementsXPlugin: Plugin<PluginOptions> = (editor) => {
  components(editor)
  blocks(editor);
};

export default elementsXPlugin;