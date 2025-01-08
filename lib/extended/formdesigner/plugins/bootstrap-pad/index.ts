import type { Editor, Plugin, PluginOptions } from 'grapesjs';
import components from './components';
import css from './style';

const elementsXPlugin: Plugin<PluginOptions> = (editor: Editor) => {
  components(editor);

  editor.on("load", function () {
    document.body?.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
  });
};

export default elementsXPlugin;