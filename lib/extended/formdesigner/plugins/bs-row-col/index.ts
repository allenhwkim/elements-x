import type { Editor, Plugin, PluginOptions } from 'grapesjs';
import components from './components';
import blocks from './blocks';
import css from './style';

const elementsXPlugin: Plugin<PluginOptions> = (editor: Editor, options: PluginOptions) => {
  components(editor);
  blocks(
    editor, 
    options.blockProps || { label: '', content: '', category: 'Inputs' }
  );

  editor.on('canvas:frame:load:body', () => {
    const head = editor.Canvas.getDocument().head;
    const style = document.createElement('style');
    style.innerHTML = css;
    head.appendChild(style);
  });
};

export default elementsXPlugin;