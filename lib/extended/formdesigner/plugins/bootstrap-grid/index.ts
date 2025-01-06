import type { BlockProperties, Editor, Plugin, PluginOptions } from 'grapesjs';
import components from './components';
import blocks from './blocks';
import css from './style';

const props: BlockProperties ={
  label: '', 
  content: '', 
  category: 'Inputs'
};

const elementsXPlugin: Plugin<PluginOptions> = (editor: Editor) => {
  components(editor);
  blocks(editor, props);

  editor.on('canvas:frame:load:body', () => {
    const head = editor.Canvas.getDocument().head;
    const style = document.createElement('style');
    style.innerHTML = css;
    head.appendChild(style);
  });
};

export default elementsXPlugin;