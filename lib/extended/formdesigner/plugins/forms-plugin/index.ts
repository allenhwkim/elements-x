import type { Editor, Plugin, PluginOptions } from 'grapesjs';
import components from './components';
import formsBlock from './blocks';

const formsPlugin: Plugin<PluginOptions> = (editor, options: PluginOptions) => {
  components(editor)
  formsBlock(editor);
};

export default formsPlugin;