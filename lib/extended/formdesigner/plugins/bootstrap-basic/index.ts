import type { BlockProperties, Editor, Plugin, PluginOptions } from 'grapesjs';
import components from './components';
import blocks from './blocks';
import css from './style';

export default function(editor: Editor, options: PluginOptions){
  components(editor);
  blocks(
    editor, 
    options as BlockProperties,
  );

  editor.on('canvas:frame:load:body', () => {
    const head = editor.Canvas.getDocument().head;
    const style = document.createElement('style');
    style.innerHTML = css;
    head.appendChild(style);
  });
};
