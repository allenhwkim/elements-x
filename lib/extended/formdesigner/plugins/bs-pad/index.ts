import type { Editor, PluginOptions } from 'grapesjs';
import css from './style';

export default function(editor: Editor, options: PluginOptions) {

  editor.on("load", function () {
    !document.querySelector('style#bs-pad') &&
      document.body?.insertAdjacentHTML('beforeend', `<style id="bs-pad">${css}</style>`);
  });

  editor.on("component:deselected run:core:component-style-clear", function () {
    document.querySelector("#gjs-tools > .bs-pad")?.remove();
    editor.Canvas.toggleFramesEvents(true);
  });

  editor.on("component:selected", function (component) {
    const compTypes = options?.types || ['div', 'bs-row', 'bs-col', ''];
    if (compTypes.includes(component.get("type"))) {
      const toolEl = document.createElement('div');
      toolEl.classList.add('bs-pad');
      toolEl.insertAdjacentHTML('beforeend', `
        <div class="top"></div><div class="bottom"></div>
        <div class="left"></div><div class="right"></div>
      `);
      document.getElementById("gjs-tools")?.appendChild(toolEl);

      Array.from(toolEl.children).forEach(el => { //.top, .bottom, .left, .right
        el.addEventListener("click", clickHandler)
      });
    }

    function clickHandler(event) { // .top .bottom .left .right
      editor.Canvas.toggleFramesEvents(false);
      // const pos = event.target.getAttribute('class').match(/\s(top|left|bottom|right)/)[1];
      const pos = event.target.getAttribute('class');
      const pos1 = {top:'t', bottom:'b', left: 's', right: 'e'}[pos];
      const oldKlass = component.getClasses().find(el => el.startsWith(`p${pos1}-`)) || `p${pos}-0`;
      // const oldKlassVal = component.getAttribute(oldKlass);
      const oldPadVal = +oldKlass.split('-')[1];

      const newPadVal = (oldPadVal + 1) % 6;
      const newKlass = `p${pos1}-${newPadVal}`;

      // update px-x class with a new size, e.g. pt-5
      component.removeClass(oldKlass)
      component.addClass(newKlass)

      // update #gjs-tools height so that the buttons located properly
      const compHeight = parseInt(window.getComputedStyle(component.getEl()).height, 10); 
      (document.querySelector('#gjs-tools') as any).style.height = compHeight + 'px';

      editor.Canvas.toggleFramesEvents(true);
    }

  });

};