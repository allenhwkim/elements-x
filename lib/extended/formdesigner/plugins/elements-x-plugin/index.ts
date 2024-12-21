import type { Editor, Plugin, PluginOptions } from 'grapesjs';
import componentsNTraits from './components';
import elementsXBlock from './blocks';

const elementsXPlugin: Plugin<PluginOptions> = (editor) => {
  componentsNTraits(editor)
  elementsXBlock(editor);
};

export default elementsXPlugin;