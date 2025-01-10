import type { BlockProperties, Editor, Plugin, PluginOptions } from 'grapesjs';
import components from './components';
import formsBlock from './blocks';

const formsPlugin: Plugin<PluginOptions> = (editor: Editor, options: PluginOptions) => {
  components(editor)
  formsBlock(editor, options as BlockProperties);
};

export default formsPlugin;