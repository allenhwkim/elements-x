import type { Editor, Plugin, PluginOptions } from 'grapesjs';
import componentsNTraits from './components';
import formsBlock from './blocks';

const formsPlugin: Plugin<PluginOptions> = (editor) => {
  componentsNTraits(editor)
  formsBlock(editor);
};

export default formsPlugin;