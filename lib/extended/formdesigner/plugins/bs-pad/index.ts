import type { Editor, Plugin, PluginOptions } from 'grapesjs';
import components from './components';
import css from './style';

export default function(editor: Editor) {
  components(editor);

  editor.on("load", function () {
    !document.querySelector('style#bs-pad') &&
      document.body?.insertAdjacentHTML('beforeend', `<style id="bs-pad">${css}</style>`);
  });
};