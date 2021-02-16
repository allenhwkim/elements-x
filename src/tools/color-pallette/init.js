var {color, colorEl, colorValueEl, msgEl} = initColors();
setColor('#ff0000');

function initColors() {
  // eslint-disable-next-line no-undef
  const color = new Color();

  const colorEl = document.querySelector('#color-1');
  const colorValueEl = document.querySelector('#color-value');
  const msgEl = document.querySelector('#msg');
  const colorPickerOverlay = document.querySelector('x-overlay[trigger=color-1]');

  // colorEl.addEventListener('change', setValues);
  colorPickerOverlay.addEventListener('x-color-selected', setValues);
  colorValueEl.addEventListener('input', showColorList);
  colorValueEl.addEventListener('change', setValues);

  document.querySelectorAll('.action-btns').forEach(el =>el.addEventListener('click', modify));
  document.querySelectorAll('.pallette').forEach(el => el.addEventListener('click', setValues));

  return {color, colorEl, colorValueEl, msgEl};
}

function setColor(hex) {
  colorEl.value = hex;
  setValues();
}

function setValues(event) {
  const colorVal = !event ? colorEl.value :
    event.target.value || event.target.getAttribute('title') || colorEl.value;

  color.set(colorVal);
  const hex = color.toCss().hex;
  colorEl.value = hex;
  colorEl.style.background = hex;
  colorValueEl.value = hex;
  msgEl.innerText = color;

  setShades(color);
  setComplementary(color);
  setAnalogous(color);
  setTriadicTetradic(color);
}

function modify(event) { // event value e.g. "spin:10"
  if (event.target.value) {
    const [action, v] = event.target.value.split(':');
    // console.log({action, v});
    colorEl.value = color[action](v);
    setValues();
  }
}

function appendColor(el, hex) {
  el.insertAdjacentHTML('beforeend',
    `<div class="color-container">
      <div class="color" title="${hex}" style="background:${hex}">&nbsp;</div>
      <div class="hex">${hex}</div>
    </div>`);
}

function setComplementary(color) {
  const pallette = document.querySelector('.complementary .pallette');
  pallette.innerHTML = '';
  appendColor(pallette, color.spin(180));
  pallette.insertAdjacentHTML('beforeend', '<b>&nbsp;</b>');
  appendColor(pallette, color.spin(150));
  appendColor(pallette, color.spin(210));
}

function setTriadicTetradic() { 
  const pallette = document.querySelector('.triadic .pallette');
  pallette.innerHTML = '';
  appendColor(pallette, color.spin(120));
  appendColor(pallette, color.spin(240));
  pallette.insertAdjacentHTML('beforeend', '<b>&nbsp;</b>');
  appendColor(pallette, color.spin(90));
  appendColor(pallette, color.spin(180));
  appendColor(pallette, color.spin(270));
}

function setAnalogous() {
  const pallette = document.querySelector('.analagous .pallette');
  pallette.innerHTML = '';
  appendColor(pallette, color.spin(30));
  appendColor(pallette, color.spin(60));
  appendColor(pallette, color.spin(90));
}


function setShades(color) {
  const shades1El = document.querySelector('.shades .pallette.shades-1');
  shades1El.innerHTML = '';
  const shades2El = document.querySelector('.shades .pallette.shades-2');
  shades2El.innerHTML = '';

  for (let i=0; i< 50; i+=5) {
    appendColor(shades1El, color.lighten(`${i}%`));
  }
  for (let i=0; i> -50; i-=5) {
    appendColor(shades2El, color.lighten(`${i}%`));
  }
}

/**
 * color list auto complete
 */
document.querySelector('#color-list-overlay')
  .addEventListener('x-listitem-selected', event => {
    setColor(event.detail.color.hex);
    document.querySelector('#color-list-overlay').close();
  });

function showColorList(event) {
  const search = event.target.value;
  const colorListEl = document.querySelector('#color-list');
  // eslint-disable-next-line no-undef
  const colors = (Color.getNamedColors(search) || []).map( ([name, hex]) => ({name, hex}));
  colorListEl.datalist = colors;
  document.querySelector('#color-list-overlay').open();
}