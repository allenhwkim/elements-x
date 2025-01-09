import { Editor } from "grapesjs";

export default function (editor: Editor) {

  editor.on("component:selected", function (component) {
    if (['row', 'cell', 'div', ''].includes(component.get("type"))) {
      const toolEl = document.createElement('div');
      toolEl.classList.add('bs-pad');
      toolEl.insertAdjacentHTML('beforeend', `
        <div class="top"></div><div class="bottom"></div>
        <div class="left"></div><div class="right"></div>
      `);
      document.getElementById("gjs-tools")?.appendChild(toolEl);

      Array.from(toolEl.children).forEach(el => {
        // set cssPropName, cssPropValue, mouseMoveHandler, and mouseUpHandler
        // mousedown: set css prop name and value to change, and add mousemove/mouseup handler
        // mousemove: update padding style by its move
        // mouseup: remove  mousemove/up handler
        // el.addEventListener("mousedown", mouseDownHandler)
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
      component.removeClass(oldKlass)
      component.addClass(newKlass)
      const compHeight = parseInt(window.getComputedStyle(component.getEl()).height, 10); 
      console.log('...........', {pos, oldKlass, oldPadVal, newPadVal, newKlass, compHeight});
      (document.querySelector('#gjs-tools') as any).style.height = compHeight + 'px';
      editor.Canvas.toggleFramesEvents(true);
    }

    let staClientY: number;
    let staClientX: number;
    let cssPropValue: number;
    let cssPropName: string;

    function mouseDownHandler(event) { // .top .bottom .left .right
      editor.Canvas.toggleFramesEvents(false);
      // const pos = event.target.getAttribute('class').match(/\s(top|left|bottom|right)/)[1];
      const pos = event.target.getAttribute('class');
      if (pos === 'left' || pos === 'right') {
        staClientX = event.clientX;
      } else {
        staClientY = event.clientY;
      }
      cssPropName = `padding-${pos}`;
      const cssProp = `padding${pos.replace(/^\S/, (el => el.toUpperCase()))}`;
      cssPropValue = parseInt(window.getComputedStyle(component.getEl())[cssProp], 10);
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    }

    function mouseMoveHandler(event) {
      event.preventDefault();
      event.stopPropagation();

      let newCssPropValue;
      editor.Canvas.toggleFramesEvents(false);

      if (cssPropName === 'padding-top' || cssPropName === 'padding-bottom') {
        newCssPropValue = cssPropValue + (event.clientY - staClientY);
      }
      if (cssPropName === 'padding-left' || cssPropName === 'padding-right') {
        newCssPropValue = cssPropValue + (event.clientX - staClientX);
      }

      if (newCssPropValue >= 0) {
        const cssProp = { [cssPropName]: `${newCssPropValue}px !important` };
        component.addStyle(cssProp); // e.g. {'padding-bottom': '121px !important'}
        editor.refresh();
        editor.trigger("component:toggled");
      }
    }

    function mouseUpHandler() {
      editor.Canvas.toggleFramesEvents(true);
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    }

  });

  editor.on("component:deselected run:core:component-style-clear", function () {
    document.querySelector("#gjs-tools > .bs-pad")?.remove();
    editor.Canvas.toggleFramesEvents(true);
  });


}